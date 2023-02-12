package com.ssafy.learnway.domain.report;

import com.ssafy.learnway.domain.BaseTime;
import com.ssafy.learnway.domain.user.User;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_report")
public class Report extends BaseTime {

    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private int declarationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="user_id")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="report_id")
    private ReportDetail reportId;

    private String etc;

//    @Column(name="report_datetime")
//    private Date regDate;
}
