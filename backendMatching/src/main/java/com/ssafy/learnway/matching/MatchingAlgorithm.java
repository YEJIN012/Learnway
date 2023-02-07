package com.ssafy.learnway.matching;

import com.ssafy.learnway.dto.matching.MatchingRequestDto;
import com.ssafy.learnway.dto.matching.MatchingResponseDto;
import com.ssafy.learnway.matching.MatchingWaitList;
import com.ssafy.learnway.matching.SendMatching;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

@Component
@Slf4j
public class MatchingAlgorithm {

    @Autowired
    SendMatching sendMatching;

    @Autowired
    MatchingWaitList matchingWaitList;

    static boolean successed;

    static MatchingResponseDto matchingResponseDto = new MatchingResponseDto();

    static Map<Object, Object> result = new HashMap<>();

    public Map<Object, Object> algorithm(){
        log.info("matching algorithm start...");

        // 알고리즘 작성 중 ....

        // 매칭 성사
        if(matchingWaitList.getMatchingWaitList().size()>=2){
            successed = true;

            MatchingRequestDto user1 = matchingWaitList.getMatchingWaitList().poll();
            MatchingRequestDto user2 = matchingWaitList.getMatchingWaitList().poll();

            // 매칭 성사되면, 매칭 결과 main server 전송
            if(successed){
                matchingResponseDto = MatchingResponseDto.builder()
                        .user1(user1).user2(user2).build();

                successed = false; // 매칭 성사 여부 reset

                result.put("successed", true);
                result.put("matchingResponseDto", matchingResponseDto);

                return result;
            }
        }

        result.put("successed",false);
        return result;
    }

}
