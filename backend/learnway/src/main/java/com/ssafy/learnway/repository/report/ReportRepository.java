package com.ssafy.learnway.repository.report;

import com.ssafy.learnway.domain.report.Report;
import com.ssafy.learnway.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Integer> {
    List<Report> findByUserId(User userId);
}
