package com.ssafy.learnway.controller.matching;

import com.ssafy.learnway.dto.matching.MatchingRequestDto;
import com.ssafy.learnway.dto.matching.MatchingResponseDto;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@Tag(name = "matching")
@RestController
@RequestMapping("/matching")
@Slf4j
public class MatchingController {

    // rabbitMQ의 EXCAHGE NAME
    private static final String EXCAHGE_NAME = "learnway.exchange";
    private static String routingKey = "learnway.routing.#";
    @Autowired
    RabbitTemplate rabbitTemplate;

    @GetMapping("/{userEmail}")
    public ResponseEntity matching(@PathVariable String userEmail) {

        // 추가 : socket 정보 넣어주기
        MatchingRequestDto matchingRequestDto = MatchingRequestDto.builder()
                        .userEmail(userEmail).build();

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
