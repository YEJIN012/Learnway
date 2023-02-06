package com.ssafy.learnway.matching;

import com.ssafy.learnway.dto.matching.MatchingRequestDto;
import com.ssafy.learnway.dto.matching.MatchingResponseDto;
import com.ssafy.learnway.matching.MatchingWaitList;
import com.ssafy.learnway.matching.SendMatching;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.*;

@RequiredArgsConstructor
@Component
@Slf4j
public class MatchingAlgorithm {

    private final SendMatching sendMatching;

    private final MatchingWaitList matchingWaitList;

    static boolean succeed;

    static MatchingResponseDto matchingResponseDto = new MatchingResponseDto();

    static Map<Object, Object> result = new HashMap<>();

    public Map<Object, Object> algorithm(){
        log.info("matching algorithm start...");

        // 알고리즘 작성 중 ....

        // 실제 매칭할 유저들 가져오기 (중간에 매칭하는 유저가 또 들어오는 걸 방지)
        while(!matchingWaitList.getMatchingWaitList().isEmpty()){
            matchingWaitList.getMatchingList().add(matchingWaitList.getMatchingWaitList().poll());
        }
        
        //최소 N초동안만 기다렸다가 모인 대기열(matchingWaitList.getMatchingList())을 가지고 랜덤 매칭을 진행한다!
        //matchingWaitList.getMatchingList() => matchingList : 실제로 매칭을 진행할 대기자들

        //서로에 대해 각각의 점수를 계산해야 하는 데 -> 최대 O(n^2) ..
        while(!matchingWaitList.getMatchingList().isEmpty()){
            // 1. 상대방이 배우고자 하는 언어 - 모국어가 일치해야 한다.
            // 2. 관심사가 일치하면 +1을 하여 가중치가 +2가 되면 조건 만족 처리를 한다
            // 3. 나이가 +=10 사이이어야 한다.
            // 4. 대기열에 먼저 들어온 순서부터 우선적으론 판별하고 확인할 수 있어야 한다.

        }



        // 매칭 성사
        if(matchingWaitList.getMatchingResultList().size()>=2){
            succeed = true;

            MatchingRequestDto user1 = matchingWaitList.getMatchingResultList().poll();
            MatchingRequestDto user2 = matchingWaitList.getMatchingResultList().poll();

            // 매칭 성사되면, 매칭 결과 main server 전송
            if(succeed){
                matchingResponseDto = MatchingResponseDto.builder()
                        .user1(user1).user2(user2).build();

                succeed = false; // 매칭 성사 여부 reset

                result.put("succeed", true);
                result.put("matchingResponseDto", matchingResponseDto);

                return result;
            }
        }

        result.put("succeed",false);
        return result;
    }

}
