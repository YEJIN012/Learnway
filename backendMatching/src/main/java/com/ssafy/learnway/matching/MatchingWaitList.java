package com.ssafy.learnway.matching;

import com.ssafy.learnway.dto.matching.MatchingRequestDto;
import com.ssafy.learnway.dto.matching.WaitUser;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@Getter
public class MatchingWaitList {
    Queue<WaitUser> matchingWaitList = new LinkedList<>(); // 매칭이 되길 기다리는 대기자들 관리

    List<WaitUser> matchingList = new ArrayList<>(); //실제로 매칭을 진행할 대기자들 관리, 15초 대기한 유저들

    // 큐는 항상 첫 번재 저장된 데이터를 삭제하므로, ArrayList와 같은 배열 기반의 자료구조를 사용하게 되면 빈공간을 채우기 위해서 데이터의 복사가 발생하므로 매우 비효율적
    // Queue는 ArrayList보다 데이터의 추가/삭제가 쉬운 LinkedList로 구현하는 것이 적합
    // Queue<MatchingRequestDto> matchingMiddleWaitQ = new LinkedList<>(); // 실제로 매칭을 진행할 대기자들 관리, 30초 대기한 유저들

    // Queue<MatchingRequestDto> matchingLongWaitQ = new LinkedList<>(); // 실제로 매칭을 진행할 대기자들 관리, 1분 대기한 유저들
    Queue<WaitUser> matchingResultList = new LinkedList<>(); //매칭 성사된 대기자들을 관리

    List<String> badList = new LinkedList<>(); // 매칭 중 나간 유저들 관리

}
