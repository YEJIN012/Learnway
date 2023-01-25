package com.ssafy.learnway.domain.user;

import com.ssafy.learnway.domain.Language;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 생성자 접근 권한을 막는다.
@Table(name = "tb_user")
public class User {
    @GeneratedValue(strategy=GenerationType.IDENTITY) //기본키 생성을 데이터베이스에 위임 AUTO_INCREMENT
    @Column(name="user_id")
    @Id
    private int userId;
    @Column(name="user_email")
    private String email;
    @Column(name="user_pwd")
    private String pwd;
    private String token;
    private String name;
    @Temporal(TemporalType.DATE) //년-월-일 의 date 타입
    private Date birthday;

    @ManyToOne(fetch = FetchType.LAZY) // 하나의 언어는 여러명의 사용자를 가진다?
    @JoinColumn(name="languageId")
    private Language languageId;

    @Column(columnDefinition = "TINYINT", length=1)
    private boolean badUser;

    @Temporal(TemporalType.TIMESTAMP) //date + time
    @Column(name="register_time")
    private Date regDate;

    private String imgUrl;
    private String bio;
}
