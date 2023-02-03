package com.ssafy.learnway.controller.report;

import com.ssafy.learnway.domain.report.Report;
import com.ssafy.learnway.dto.report.ReportDto;
import com.ssafy.learnway.service.UserService;
import com.ssafy.learnway.service.report.ReportService;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = {"reports"})
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;

    private final UserService userService;

    @ApiOperation(value = "신고 내용 등록", notes = "유저 신고를 한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping
    public ResponseEntity writeArticle(@RequestBody @ApiParam(value = "신고 내역 정보.", required = true) ReportDto reportDto) throws Exception {

        if(userService.findByEmail(reportDto.getUserEmail()) == null){
            return new ResponseEntity<>("검색되는 유저가 없습니다.", HttpStatus.ACCEPTED);
        }

        if (reportService.writeReport(reportDto) != null) {
            List<Report> reportList = reportService.findByUserId(reportDto);
            if(reportList.size()>=3){
                // bad_user로 등록!
                reportService.addBadUser(reportDto);
                return ResponseHandler.generateResponse("신고가 기록되었고, badUser로 등록되었습니다.", HttpStatus.OK);
            }
            return ResponseHandler.generateResponse("신고가 기록되었습니다.", HttpStatus.OK);
        }

        return new ResponseEntity<>("신고 기록을 실패하였습니다.", HttpStatus.ACCEPTED);
    }

}
