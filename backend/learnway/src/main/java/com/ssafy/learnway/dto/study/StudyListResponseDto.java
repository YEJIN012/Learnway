package com.ssafy.learnway.dto.study;

import com.ssafy.learnway.domain.Language;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.LanguageDto;
import lombok.*;

import javax.persistence.*;
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

    private long friendId;

    private String script;

    private LocalDateTime createdDate;

    private LanguageDto language;
}
