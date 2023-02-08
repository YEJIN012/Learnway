package com.ssafy.learnway.matching;


import com.ssafy.learnway.dto.matching.MatchingResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * 대기자들 큐에서 관리
 * 30초마다 matching 확인
 * matching -> matching algorithm ->(성사되면) main server 전송
 **/
@Component
@Slf4j
public class Matching {

    @Autowired
    MatchingAlgorithm matchingAlgorithm;

    @Autowired
    SendMatching sendMatching;

    static boolean successed;

    static Map<Object, Object> result = new HashMap<>();

    MatchingResponseDto matchingResponseDto;
    @Scheduled(fixedDelay = 30000, initialDelay = 1000) // 1초 후 30초마다 동작
    public void matching(){
        log.info("matching start...");

        result = matchingAlgorithm.algorithm(); // 매칭 알고리즘

        successed = (boolean) result.get("successed"); // 성사 여부
        if(successed){ // 성사되면 main server 전송
            matchingResponseDto = (MatchingResponseDto)result.get("matchingResponseDto");
            sendMatching.sendMatching(matchingResponseDto);
        }

    }
}
