package com.ssafy.learnway.dto.matching;

import com.ssafy.learnway.dto.user.ProfileDto;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Result {
    ProfileDto profileDto;

    String roomId;

    boolean flag;
}
