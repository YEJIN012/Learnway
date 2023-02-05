package com.ssafy.learnway.matching.algorithm;

import com.ssafy.learnway.dto.matching.MatchingRequestDto;
import com.ssafy.learnway.dto.matching.MatchingResponseDto;
import com.ssafy.learnway.matching.MatchingWaitList;
import com.ssafy.learnway.matching.SendMatching;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.Queue;

@Component
@Slf4j
public class MatchingAlgorithm {

    @Autowired
    SendMatching sendMatching;

    @Autowired
    MatchingWaitList matchingWaitList;
    public MatchingResponseDto algorithm(){
        // log.info("algorithm : "+matchingRequestDto.toString());
        // matchingRequests.add(matchingRequestDto);
        log.info("matching algorithm start...");


        // 알고리즘 작성 중 ....



        MatchingRequestDto user1 = matchingWaitList.getMatchingWaitList().poll();
        MatchingRequestDto user2 = matchingWaitList.getMatchingWaitList().poll();

        boolean successed = true;

        // 매칭 완료 성사되면, 매칭 결과 main server 전송
        if(successed){
            MatchingResponseDto matchingResponseDto = MatchingResponseDto.builder()
                    .user1(user1).user2(user1).build();

            sendMatching.sendMatching(matchingResponseDto);
            successed = false;
            log.info("successed: "+ successed);
        }
        return matchingResponseDto;
    }

}
