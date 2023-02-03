package com.ssafy.learnway.controller.study;

import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.study.StudyListRequestDto;
import com.ssafy.learnway.dto.study.StudyListResponseDto;
import com.ssafy.learnway.dto.study.StudyMonthResponseDto;
import com.ssafy.learnway.dto.study.StudyRecordRequestDto;
import com.ssafy.learnway.service.UserService;
import com.ssafy.learnway.service.study.StudyService;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

@Api(tags = {"study"})
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/study")
public class StudyController {

    private final StudyService studyService;

    private final UserService userService;

    //날짜별 채팅내역 조회
    @ApiOperation(value = "학습 정보", notes = "날짜에 대한 학습 기록을 리턴한다.")
    @PostMapping("/day")
    public ResponseEntity list(@RequestBody @ApiParam(value = "학습 정보 (userId, date(선택한 날짜))", required = true) StudyListRequestDto studyListDto) throws SQLException {
        try {
            List<StudyListResponseDto> studyList = studyService.selectStudyList(studyListDto);

            if(studyList.isEmpty() || studyList == null){
                return ResponseHandler.generateResponse("검색된 학습 목록이 없습니다.", HttpStatus.ACCEPTED);
            }

            return ResponseHandler.generateResponse("검색된 날짜의 학습 목록입니다.", HttpStatus.OK, "studyList", studyList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("서버 오류입니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    //학습 기록
    @ApiOperation(value = "학습 기록", notes = "화상이 마치면 해당 학습에 대한 정보를 기록한다.")
    @PostMapping
    public ResponseEntity record(@RequestBody @ApiParam(value = "기록에 관한 정보", required = true) StudyRecordRequestDto studyRecordRequestDto) throws SQLException {
        try {
            studyService.insertStudy(studyRecordRequestDto);
            return ResponseHandler.generateResponse("학습 기록이 완료되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("서버 오류입니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "월별 기록 count", notes = "달력에 표시용")
    @GetMapping("/month")
    public ResponseEntity listCount(@RequestParam(name = "user_email") String userEmail, @RequestParam(name = "study_month") @DateTimeFormat(pattern = "yyyy-MM") Date day) throws SQLException {
        try {
            User user = userService.findByEmail(userEmail);
            if(user == null){
                return ResponseHandler.generateResponse("없는 유저입니다", HttpStatus.BAD_REQUEST);
            }
            List<StudyMonthResponseDto> monthCountList = studyService.selectStudyMonthList(user, day);

//            for(int i=0; i<monthCountList.size(); i++){
//                System.out.println(monthCountList.get(i));
//            }
            return ResponseHandler.generateResponse("선택된 달의 기록입니다.", HttpStatus.OK, "monthCountList",monthCountList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("서버 오류입니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
