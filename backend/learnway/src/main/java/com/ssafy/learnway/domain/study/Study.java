package com.ssafy.learnway.domain.study;

import com.ssafy.learnway.domain.BaseTime;
import com.ssafy.learnway.domain.Language;
import com.ssafy.learnway.domain.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_study")
public class Study extends BaseTime {

    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private int videoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "user_id", name="\"user_id\"")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "user_id", name="friend_id")
    private User friendId; //학습을 같이 한 상대방 아이디. 여기서 친구 개념이 아니다.

    @Column(columnDefinition = "TEXT")
    private String script;

//    @Temporal(TemporalType.TIMESTAMP) //date + time
//    @Column(name="study_datetime")
//    private LocalDateTime studyDatetime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="languageId")
    private Language languageId;
}
