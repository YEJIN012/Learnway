package com.ssafy.learnway.dto.study;


import com.ssafy.learnway.domain.user.User;
import lombok.*;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor
public class StudyProvideRequestDto { //학습기록 request

    private User userId;
    private Date date;
}
