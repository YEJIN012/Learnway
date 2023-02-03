package com.ssafy.learnway.dto.conversation;

import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ConvTransDto { //오늘의 회화 결과
    private List<String> lng; //모국어 변역
    private List<String> studyLng; //학습하고 싶은 언어 변역
}
