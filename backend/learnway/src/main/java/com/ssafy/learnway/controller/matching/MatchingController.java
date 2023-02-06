package com.ssafy.learnway.controller.matching;

import com.ssafy.learnway.dto.interest.InterestDto;
import com.ssafy.learnway.dto.matching.MatchingRequestDto;
import com.ssafy.learnway.dto.matching.MatchingResponseDto;
import com.ssafy.learnway.dto.user.UserDto;
import com.ssafy.learnway.service.user.UserService;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Api(tags = {"matching"})
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

    @GetMapping("/{userEmail}")
    public ResponseEntity matching(@PathVariable String userEmail, @RequestParam(name = "studyLanguageId") int studyLanguageId) throws SQLException {

        UserDto user = userService.userInfo(userEmail);

        if(user == null){
            return ResponseHandler.generateResponse("존재하지 않는 사용자입니다.", HttpStatus.BAD_REQUEST);
        }

        List<Integer> interests = new ArrayList<>();

        for(InterestDto interest : user.getInterests()){
            interests.add(interest.getInterestId());
        }

        // TODO : socket 정보 넣어주기
        MatchingRequestDto matchingRequestDto = MatchingRequestDto.builder()
                .userEmail(user.getUserEmail())
                .birthDay(user.getBirthDay())
                .languageId(user.getLanguage().getLanguageId())
                .studyId(studyLanguageId)
                .interestId(interests)
                .enterTime(LocalDateTime.now())
                .build();


        log.info("send message.....");

        rabbitTemplate.convertAndSend(EXCAHGE_NAME, routingKey, matchingRequestDto); // rabbit MQ 전송
        return ResponseHandler.generateResponse("성공", HttpStatus.ACCEPTED);
    }


    @PostMapping("/result")
    public ResponseEntity matching(@RequestBody MatchingResponseDto matchingResponseDto) {

        log.info(matchingResponseDto.toString());

        // socket통신
        // user1 socket을 통해 user2의 이메일 전송(profile을 전송 할 수도!)
        // user2 socket을 통해 user1의 이메일 전송(profile을 전송 할 수도!)

        return ResponseHandler.generateResponse("화상채팅이 성사되었습니다.", HttpStatus.ACCEPTED);
    }
}
