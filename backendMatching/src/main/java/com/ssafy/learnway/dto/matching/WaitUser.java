package com.ssafy.learnway.dto.matching;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class WaitUser {
    MatchingRequestDto matchingRequestDto;

    int matchingTurn; // 15, 30, 45초마다 취향 가중치 설정을 다르게 하기위한 변수

}
