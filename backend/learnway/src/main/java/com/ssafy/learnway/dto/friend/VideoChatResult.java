package com.ssafy.learnway.dto.friend;

import com.ssafy.learnway.dto.user.ProfileDto;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class VideoChatResult {
    ProfileDto userProfileDto;
    ProfileDto friendProfileDto;
    String roomId;
}
