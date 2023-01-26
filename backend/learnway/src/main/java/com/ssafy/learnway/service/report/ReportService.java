package com.ssafy.learnway.service.report;

import com.ssafy.learnway.domain.report.Report;
import com.ssafy.learnway.dto.report.ReportDto;
import com.ssafy.learnway.repository.report.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Transactional
    public Report writeReport(ReportDto reportDto) throws Exception {
        return reportRepository.save(reportDto.toEntity()); // Report 객체를 반환해준다.
    }
}
