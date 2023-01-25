package com.ssafy.learnway.domain.user;

import com.ssafy.learnway.domain.Interest;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_user_interest")
public class UserInterest {
    // 한 사용자는 여러개의 관심사를 가진다. 한 관심사는 여러 사용자의 관심을 가진다.

    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    private int userInterestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="interest_id")
    private Interest interestId;

}
