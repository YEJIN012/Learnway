package com.ssafy.learnway.dto.friend;

import com.ssafy.learnway.domain.user.User;
import lombok.*;

import java.io.Serializable;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FriendDto implements Serializable {
    private int relationId;
    private User userId;
    private User friendId;
}
