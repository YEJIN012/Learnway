package com.ssafy.learnway.dto.matching;

import lombok.*;

import java.io.Serializable;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MatchingResponseDto implements Serializable {
    private static final long serialVersionUID = 4529685098267757690L;
    MatchingRequestDto user1;
    MatchingRequestDto user2;
}
