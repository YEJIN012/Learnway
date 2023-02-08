package com.ssafy.learnway.dto.matching;

import lombok.*;

import java.io.Serializable;

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
public class MatchingRequestDto implements Serializable {

    // 직렬화 - 역직렬화 시에 serialVersionUID를 키로 객체의 호환을 따짐
    // producer에서 보내는 MatchingRequestDto의 객체가 맞는지 확인하기 위해 serialVersionUID가 필요함
    private static final long serialVersionUID = 6529685098267757690L;
    String userEmail;
    String socket;
}
