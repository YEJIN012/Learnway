package com.ssafy.learnway.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.learnway.domain.user.User;
import lombok.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class UserSignupDto {
    String userEmail;
    String userPwd;

    String name;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate birthDay;

    LanguageDto language;

    List<InterestDto>  interests;

    public User toEntity(){
        return User.builder()
                .userEmail(userEmail)
                .userPwd(userPwd)
                .roles(Collections.singletonList("ROLE_USER"))
                .name(name)
                .birthday(birthDay)
                .languageId(language.toEntity())
                .build();
    }
}
