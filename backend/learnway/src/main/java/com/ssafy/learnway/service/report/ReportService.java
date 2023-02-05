package com.ssafy.learnway.service.report;

import com.ssafy.learnway.domain.report.Report;
import com.ssafy.learnway.domain.report.ReportDetail;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.report.ReportDto;
import com.ssafy.learnway.repository.user.UserRepository;
import com.ssafy.learnway.repository.report.ReportDetailRepository;
import com.ssafy.learnway.repository.report.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;

    private final UserRepository userRepository;

    private final ReportDetailRepository reportDetailRepository;

    @Transactional
    public Report writeReport(ReportDto reportDto) throws Exception {
        User user = userRepository.findByUserEmail(reportDto.getUserEmail());
        ReportDetail reportDetail = reportDetailRepository.findByReportId(reportDto.getReportId()+1); //front단보다 +1
        Report report = Report.builder().userId(user).reportId(reportDetail)
                .etc(reportDto.getEtc()).build();
        return reportRepository.save(report);
//        return reportRepository.save(reportDto.toEntity()); // Report 객체를 반환해준다.
    }

    public List<Report> findByUserId(ReportDto reportDto){
        User user = userRepository.findByUserEmail(reportDto.getUserEmail());
        return reportRepository.findByUserId(user);
    }

    public void addBadUser(ReportDto reportDto){
        User user = userRepository.findByUserEmail(reportDto.getUserEmail());
        user.updateBadUser(true);
        userRepository.save(user);//업데이트
    }
}
