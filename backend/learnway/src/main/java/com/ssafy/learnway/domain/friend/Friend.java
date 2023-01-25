package com.ssafy.learnway.domain.friend;

import com.ssafy.learnway.domain.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_friend")
public class Friend {
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private int relationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "user_id", name="user_id")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "user_id", name="friend_id")
    private User friendId;
}
