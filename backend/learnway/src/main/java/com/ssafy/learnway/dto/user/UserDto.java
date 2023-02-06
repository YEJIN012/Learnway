package com.ssafy.learnway.dto.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.language.LanguageDto;
import com.ssafy.learnway.dto.interest.InterestDto;
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
public class UserDto {
    Long userId;
    String userEmail;
    String userPwd;

    String name;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate birthDay;

    LanguageDto language;

    List<InterestDto>  interests;

    boolean badUser;

    String imgUrl;

    String bio;

    String provider;

    String providerId;

    public UserDto(User user){
        this.userEmail = user.getUserEmail();
        this.name = user.getName();
        this.userPwd = user.getUserPwd();
    }

    public User toEntity(){
        return User.builder()
                .userId(userId)
                .userEmail(userEmail)
                .userPwd(userPwd)
                .roles(Collections.singletonList("ROLE_USER"))
                .name(name)
                .birthday(birthDay)
                .languageId(language.toEntity())
                .badUser(badUser)
                .imgUrl(imgUrl)
                .bio(bio)
                .build();
    }

}
