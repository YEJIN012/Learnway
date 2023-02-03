package com.ssafy.learnway.dto.study;

import com.ssafy.learnway.dto.LanguageDto;
import com.ssafy.learnway.dto.ProfileDto;
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
