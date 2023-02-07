package com.ssafy.learnway.matching;

import com.ssafy.learnway.dto.matching.MatchingRequestDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@Getter
public class MatchingWaitList {
    Queue<MatchingRequestDto> matchingWaitList = new LinkedList<>(); // 매칭이 되길 기다리는 대기자들 관리

    List<MatchingRequestDto> matchingList = new ArrayList<>(); //실제로 매칭을 진행할 대기자들 관리

    Queue<MatchingRequestDto> matchingResultList = new LinkedList<>(); //매칭 성사된 대기자들을 관리

//    Queue<MatchingRequestDto> matchingLongWaitList = new LinkedList<>(); // 오래 기다린 매칭 대기자들 관리
}
