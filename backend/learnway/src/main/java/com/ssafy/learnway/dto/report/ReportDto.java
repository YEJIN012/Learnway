package com.ssafy.learnway.dto.report;

import com.ssafy.learnway.domain.report.Report;
import com.ssafy.learnway.domain.report.ReportDetail;
import com.ssafy.learnway.domain.user.User;
import lombok.*;

import java.util.Collections;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReportDto { //request용
    private User userId;
    private ReportDetail reportId;

    public Report toEntity(){
        return Report.builder()
                .userId(userId)
                .reportId(reportId)
                .build();
    }
}
