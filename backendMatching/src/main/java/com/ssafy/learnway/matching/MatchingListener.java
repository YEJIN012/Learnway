package com.ssafy.learnway.matching;

import com.ssafy.learnway.dto.matching.MatchingRequestDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Slf4j
@Component
public class MatchingListener {

    private final MatchingWaitList matchingWaitList;


    //  String 타입의 메세지를 전송받을 때 사용하는 코드
    @RabbitListener(queues = "learnway.queues")
    public void receiveMessage(final Message message) {
        log.info(message.toString());
        matchingWaitList.getBadList().add(message.toString());

    }

    // 객체를 전송받을 때 사용하는 코드
    @RabbitListener(queues = "learnway.queues")
    public void receiveMessage(MatchingRequestDto matchingRequestDto) {

        log.info("receive message : " + matchingRequestDto.toString());

        // 매칭 대기자 추가
        matchingWaitList.getMatchingWaitList().add(matchingRequestDto); //매칭 성사되길 기다리는 대기자들 명단

    }
}
