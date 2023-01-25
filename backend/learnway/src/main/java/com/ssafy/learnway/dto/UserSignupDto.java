package com.ssafy.learnway.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.learnway.domain.Interest;
import com.ssafy.learnway.domain.Language;
import com.ssafy.learnway.domain.user.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Date;
import java.util.List;

// 회원가입 요청 dto
@Getter
public class UserSignupDto {
    private final String userEmail;
    private final String userPwd;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate birthDay;

    private final Language languageId;

    private final List<Interest>  interests;


    @Builder
    public UserSignupDto(String userEmail, String userPwd, LocalDate birthDay, Language languageId, List<Interest>  interests){
        this.userEmail = userEmail;
        this.userPwd = userPwd;
        this.birthDay = birthDay;
        this.languageId = languageId;
        this.interests = interests;
    }
    public User toEntity(){
        return User.builder()
                .userEmail(userEmail)
                .userPwd(userPwd)
                .roles(Collections.singletonList("ROLE_USER"))
                .birthday(birthDay)
                .languageId(languageId)
                .build();
    }

}
