package com.ssafy.learnway.dto.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.learnway.dto.language.LanguageDto;
import com.ssafy.learnway.dto.interest.InterestDto;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ProfileDto {

    String userEmail;

    String name;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate birthDay;

    LanguageDto language;

    List<InterestDto> interests;

    String imgUrl;

    String bio;

}
