package com.ssafy.learnway.domain.study;

import com.ssafy.learnway.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_study")
public class Study {

    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private int videoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "user_id", name="user_id")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "user_id", name="friend_id")
    private User friendId;

    private String script;

    @Temporal(TemporalType.TIMESTAMP) //date + time
    @Column(name="study_datetime")
    private Date regTime;
}
