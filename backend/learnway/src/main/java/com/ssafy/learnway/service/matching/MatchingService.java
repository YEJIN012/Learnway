package com.ssafy.learnway.service.matching;

import com.ssafy.learnway.dto.interest.InterestDto;
import com.ssafy.learnway.dto.matching.MatchingRequestDto;
import com.ssafy.learnway.dto.user.UserDto;
import com.ssafy.learnway.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class MatchingService {

    // rabbitMQ의 EXCAHGE NAME
    private static final String EXCAHGE_NAME = "learnway.exchange";
    private static String routingKey = "learnway.routing.#";

    private final UserService userService;

    private final RabbitTemplate rabbitTemplate;

    private final SimpMessageSendingOperations messagingTemplate;

    public void addMatchingUser(String roomId, String sessionId){

        String[] sp = roomId.split("/"); //userEmail/studyId
        UserDto user = userService.userInfo(sp[0]);

        if(user == null){
            return;
        }

        List<Integer> interests = new ArrayList<>();

        for(InterestDto interest : user.getInterests()){
            interests.add(interest.getInterestId());
        }

        Calendar now = Calendar.getInstance();
        Integer currentYear = now.get(Calendar.YEAR);

        SimpleDateFormat sf = new SimpleDateFormat("yyyy");
        int year = Integer.parseInt(sf.format(user.getBirthDay()));


        MatchingRequestDto matchingRequestDto = MatchingRequestDto.builder()
                .userEmail(user.getUserEmail())
                .age(currentYear - year)
                .languageId(user.getLanguage().getLanguageId())
                .studyId(Integer.parseInt(sp[1]))
                .interestId(interests)
                .enterTime(LocalDateTime.now())
                .socket(roomId)
                .sessionId(sessionId)
                .build();

        log.info("send message.....");

        rabbitTemplate.convertAndSend(EXCAHGE_NAME, routingKey, matchingRequestDto); // rabbit MQ 전송

    }
}
