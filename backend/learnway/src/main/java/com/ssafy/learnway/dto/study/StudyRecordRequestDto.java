package com.ssafy.learnway.dto.study;

import com.ssafy.learnway.domain.Language;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor
public class StudyRecordRequestDto {

//    private int videoId;
    private String userEmail;

    private String friendEmail;

    private String recordId;
//    private String recordUri;
//    private LocalDateTime studyDatetime;

    private int languageId;
}
