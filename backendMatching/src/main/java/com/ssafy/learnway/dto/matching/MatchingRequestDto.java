package com.ssafy.learnway.dto.matching;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * producer와 consumer의 dto가 위치한 package명을 통일시켜야함!
 *
 * **/
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MatchingRequestDto implements Serializable, Comparable<MatchingRequestDto> {

    // 직렬화 - 역직렬화 시에 serialVersionUID를 키로 객체의 호환을 따짐
    // producer에서 보내는 MatchingRequestDto의 객체가 맞는지 확인하기 위해 serialVersionUID가 필요함
    private static final long serialVersionUID = 6529685098267757690L;
    String userEmail;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate birthDay;

    int languageId; //본인의 언어

    int studyId; //학습할 언어

    List<Integer> interestId;

    String socket;
    LocalDateTime enterTime;

    @Override
    public int compareTo(MatchingRequestDto o) {
        return this.enterTime.compareTo(o.enterTime);
    }
}
