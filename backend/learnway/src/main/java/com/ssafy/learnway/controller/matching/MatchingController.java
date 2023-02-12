package com.ssafy.learnway.controller.matching;

import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.interest.InterestDto;
import com.ssafy.learnway.dto.matching.MatchingRequestDto;
import com.ssafy.learnway.dto.matching.MatchingResponseDto;
import com.ssafy.learnway.dto.matching.Result;
import com.ssafy.learnway.dto.user.ProfileDto;
import com.ssafy.learnway.dto.user.UserDto;
import com.ssafy.learnway.service.user.UserService;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

@Tag(name = "matching")
@RestController
@RequiredArgsConstructor
@RequestMapping("/matching")
@Slf4j
public class MatchingController {

    // rabbitMQ의 EXCAHGE NAME
    private static final String EXCAHGE_NAME = "learnway.exchange";
    private static String routingKey = "learnway.routing.#";

    private final UserService userService;

    private final RabbitTemplate rabbitTemplate;

    private final SimpMessageSendingOperations messagingTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //매칭 요청을 한다.
    @GetMapping("/{userEmail}")
    public ResponseEntity matching(@PathVariable String userEmail, @RequestParam(name = "studyLanguageId") int studyLanguageId) throws SQLException {

        UserDto user = userService.userInfo(userEmail);

        if(user == null){
            return ResponseHandler.generateResponse("존재하지 않는 사용자입니다.", HttpStatus.BAD_REQUEST);
        }

        // socket 방 생성 (대기방을 구독하고 있는 개념)
        String roomId = user.getUserEmail() + "-" +studyLanguageId; //socket 방을 [userEmail/학습언어]로 지정ß

        return ResponseHandler.generateResponse("대기방이 생성되었습니다", HttpStatus.ACCEPTED,"roomId",roomId);
    }


    @PostMapping("/result")
    public ResponseEntity matching(@RequestBody MatchingResponseDto matchingResponseDto) throws SQLException {

        log.info(matchingResponseDto.toString());

        MatchingRequestDto user1 = matchingResponseDto.getUser1();
        MatchingRequestDto user2 = matchingResponseDto.getUser2();

        // TODO 중간에 나간 유저인지 확인

        ProfileDto matchingUser1 = userService.getProfile(user1.getUserEmail());
        ProfileDto matchingUser2 = userService.getProfile(user2.getUserEmail());

        // 방 이름 생성
        String roomId = passwordEncoder.encode(matchingUser1.getUserEmail()+matchingUser2.getUserEmail());

        Result matchingUser1Result = Result.builder().profileDto(matchingUser2).roomId(roomId).build();
        Result matchingUser2Result = Result.builder().profileDto(matchingUser1).roomId(roomId).build();

        // socket통신
        // user1 socket을 통해 user2의 이메일 전송(profile을 전송 할 수도!)
        messagingTemplate.convertAndSend("/sub/chat/room/" + user1.getSocket(), matchingUser2Result);

        // user2 socket을 통해 user1의 이메일 전송(profile을 전송 할 수도!)
        messagingTemplate.convertAndSend("/sub/chat/room/" + user2.getSocket(), matchingUser1Result);

        return ResponseHandler.generateResponse("화상채팅이 성사되었습니다.", HttpStatus.ACCEPTED);
    }
}
