package com.ssafy.learnway.dto.study;


import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor
public class StudyListRequestDto { //학습기록 request

    private String userEmail;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;
}
