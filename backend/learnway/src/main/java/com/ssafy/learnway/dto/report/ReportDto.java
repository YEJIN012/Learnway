package com.ssafy.learnway.dto.report;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReportDto { //request용
    private String userEmail;
    private int reportId;//선택한 번호 (신고)
    private String etc;

//    public Report toEntity(){
//        return Report.builder()
//                .userId(userId)
//                .reportId(reportId)
//                .build();
//    }
}
