package com.ssafy.learnway.matching;

import com.ssafy.learnway.dto.matching.MatchingRequestDto;

import com.ssafy.learnway.dto.matching.MatchingResponseDto;
import com.ssafy.learnway.matching.algorithm.MatchingAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class MatchingListener {

    @Autowired
    MatchingAlgorithm matchingAlgorithm;

    @Autowired
    MatchingWaitList matchingWaitList;


//    //  String 타입의 메세지를 전송받을 때 사용하는 코드
//    @RabbitListener(queues = "learnway.queues")
//    public void receiveMessage(final Message message) {
//        log.info(message.toString());
//
//    }

    // 객체를 전송받을 때 사용하는 코드
    @RabbitListener(queues = "learnway.queues")
    public void receiveMessage(MatchingRequestDto matchingRequestDto) {

        log.info("receive message : " + matchingRequestDto.toString());

        // 매칭 대기자 추가
        matchingWaitList.getMatchingWaitList().add(matchingRequestDto);

        // 매칭 알고리즘
        // MatchingResponseDto matchingResponseDto = matchingAlgorithm.algorithm(matchingRequestDto);
        matchingAlgorithm.algorithm();

    }
}
