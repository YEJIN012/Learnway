package com.ssafy.learnway.domain.report;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_report_detail")
public class ReportDetail {

    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private int reportId;
    private String name;
}
