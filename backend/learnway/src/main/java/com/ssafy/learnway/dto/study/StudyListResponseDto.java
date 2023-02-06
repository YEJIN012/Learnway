package com.ssafy.learnway.dto.study;

import com.ssafy.learnway.dto.language.LanguageDto;
import com.ssafy.learnway.dto.user.ProfileDto;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor
public class StudyListResponseDto {
    private int videoId;

    private long userId;

    private String script;

    private LocalDateTime createdDate;

    private LanguageDto language;
    
    private ProfileDto profileDto; //상대방 프로필
}
