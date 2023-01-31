package com.ssafy.learnway.dto.friend;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FriendDto {
    private String userEmail;
    private String friendEmail;
}
