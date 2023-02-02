package com.ssafy.learnway.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor
public class FriendRequestDto {
    String userEmail;
    String friendEmail;
}
