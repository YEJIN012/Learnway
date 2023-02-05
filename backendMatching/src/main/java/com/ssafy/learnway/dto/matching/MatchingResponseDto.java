package com.ssafy.learnway.dto.matching;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MatchingResponseDto {
    MatchingRequestDto user1;
    MatchingRequestDto user2;
}
