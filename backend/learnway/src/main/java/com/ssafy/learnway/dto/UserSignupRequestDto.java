package com.ssafy.learnway.dto;

import com.ssafy.learnway.domain.user.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

// 회원가입 요청 dto
@Getter
public class UserSignupRequestDto {
    private final String userEmail;
    private final String userPwd;

    @Builder
    public UserSignupRequestDto(String userEmail, String userPwd){
        this.userEmail = userEmail;
        this.userPwd = userPwd;
    }
    public User toEntity(){
        return User.builder()
                .userEmail(userEmail)
                .userPwd(userPwd)
                .roles(Collections.singletonList("ROLE_USER"))
                .build();
    }

}
