package com.ssafy.learnway.repository.report;

import com.ssafy.learnway.domain.report.ReportDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportDetailRepository extends JpaRepository<ReportDetail, Integer> {
    ReportDetail findByReportId(int reportId);
}
