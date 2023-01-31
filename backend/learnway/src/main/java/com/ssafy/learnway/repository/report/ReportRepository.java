package com.ssafy.learnway.repository.report;

import com.ssafy.learnway.domain.report.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Integer> {

}
