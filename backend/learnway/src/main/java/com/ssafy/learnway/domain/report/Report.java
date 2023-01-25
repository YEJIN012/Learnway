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
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User userId;

    @OneToMany(mappedBy = "", cascade = CascadeType.ALL)
    private List<ReportDetail> reportList = new ArrayList<>();

    @Column(name="report_datetime")
    private Date regDate;
}
