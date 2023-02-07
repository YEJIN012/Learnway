package com.ssafy.learnway.matching;

import com.ssafy.learnway.dto.matching.MatchingRequestDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.Queue;

@Component
@Getter
public class MatchingWaitList {
    Queue<MatchingRequestDto> matchingWaitList = new LinkedList<>(); // 매칭 대기자들 관리

    Queue<MatchingRequestDto> matchingLongWaitList = new LinkedList<>(); // 오래 기다린 매칭 대기자들 관리
}
