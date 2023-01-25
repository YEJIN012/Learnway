package com.ssafy.learnway.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "tb_refresh_token")
@Getter
@NoArgsConstructor
//BaseTimeEntity 상속받아 추후 exprire시간과 비교해서 만료시켜줌
public class RefreshToken extends BaseTime {

    @Id
    @Column(name = "token_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_key", nullable = false)
    private Long userKey;

    @Column(nullable = false)
    private String token;

    public RefreshToken updateToken(String token){
        this.token = token;
        return this;
    }
    @Builder
    public RefreshToken(Long userKey, String token){
        this.userKey = userKey;
        this.token = token;
    }

}
