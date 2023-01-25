package com.ssafy.learnway.domain.report;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_report_detail")
public class ReportDetail {

    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private int reportId;
    private String name;
}
