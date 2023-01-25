package com.ssafy.learnway.domain.report;

import com.ssafy.learnway.domain.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_report")
public class Report {

    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private int declarationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="report_id")
    private ReportDetail reportId;

    @Column(name="report_datetime")
    private Date regDate;
}
