package com.ssafy.learnway.matching;

import com.ssafy.learnway.dto.matching.MatchingRequestDto;

import com.ssafy.learnway.dto.matching.WaitUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.LinkedList;
import java.util.List;

@Slf4j
@Component
public class MatchingListener {

    @Autowired
    MatchingWaitList matchingWaitList;


    //  String 타입의 메세지를 전송받을 때 사용하는 코드
    @RabbitListener(queues = "learnway.bad.queues")
    public void receiveMessage(final Message message) throws UnsupportedEncodingException {
        log.info(message.toString());
        log.info( new String(message.getBody(), "UTF-8"));
        String sessionId = new String(message.getBody(), "UTF-8");
        matchingWaitList.getBadList().add(sessionId);

    }

    // 객체를 전송받을 때 사용하는 코드
    @RabbitListener(queues = "learnway.queues")
    public void receiveMessage(MatchingRequestDto matchingRequestDto) {

        log.info("receive message : " + matchingRequestDto.toString());

        // 매칭 대기자 추가
        matchingWaitList.getMatchingWaitList().add(WaitUser.builder().matchingRequestDto(matchingRequestDto).matchingTurn(0).build());

    }
}
