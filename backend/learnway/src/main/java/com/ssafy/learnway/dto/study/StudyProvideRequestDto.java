package com.ssafy.learnway.dto.study;


import com.ssafy.learnway.domain.user.User;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor
public class StudyProvideRequestDto { //학습기록 request

    private Long userId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;
}
