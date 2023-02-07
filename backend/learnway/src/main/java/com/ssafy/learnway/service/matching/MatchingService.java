package com.ssafy.learnway.service.matching;


import com.ssafy.learnway.dto.matching.MatchingRequestDto;
import com.ssafy.learnway.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MatchingService {

    // rabbitMQ의 EXCAHGE NAME
    private static final String EXCAHGE_NAME = "learnway.exchange";
    private static String routingKey = "learnway.routing.#";

    private final UserService userService;

    private final RabbitTemplate rabbitTemplate;

    private final SimpMessageSendingOperations messagingTemplate;

    public void sendRequestMatching(MatchingRequestDto matchingRequestDto){

        log.info("send message.....");

        rabbitTemplate.convertAndSend(EXCAHGE_NAME, routingKey, matchingRequestDto); // rabbit MQ 전송

    }

}
