package com.ssafy.learnway.service.report;

import com.ssafy.learnway.domain.report.Report;
import com.ssafy.learnway.domain.report.ReportDetail;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.report.ReportDto;
import com.ssafy.learnway.repository.UserRepository;
import com.ssafy.learnway.repository.report.ReportDetailRepository;
import com.ssafy.learnway.repository.report.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReportDetailRepository reportDetailRepository;

    @Transactional
    public Report writeReport(ReportDto reportDto) throws Exception {
        User user = userRepository.findByUserId(reportDto.getUserId());
        ReportDetail reportDetail = reportDetailRepository.findByReportId(reportDto.getReportId()+1); //front단보다 +1
        Report report = Report.builder().userId(user).reportId(reportDetail)
                .etc(reportDto.getEtc()).build();
        return reportRepository.save(report);
//        return reportRepository.save(reportDto.toEntity()); // Report 객체를 반환해준다.
    }
}
