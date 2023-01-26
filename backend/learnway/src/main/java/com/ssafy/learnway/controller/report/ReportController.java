package com.ssafy.learnway.controller.report;

import com.ssafy.learnway.dto.report.ReportDto;
import com.ssafy.learnway.service.report.ReportService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"reports"})
@RestController
@Slf4j
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @ApiOperation(value = "신고 내용 등록", notes = "유저 신고를 한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping
    public ResponseEntity<String> writeArticle(@RequestBody @ApiParam(value = "신고 내역 정보.", required = true) ReportDto reportDto) throws Exception {

        log.info(reportDto.getReportId().toString());
        if (reportService.writeReport(reportDto) != null) {
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
        return new ResponseEntity<>("fail", HttpStatus.NO_CONTENT);
    }

}
