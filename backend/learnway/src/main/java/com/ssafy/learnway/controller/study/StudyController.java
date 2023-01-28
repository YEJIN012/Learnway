package com.ssafy.learnway.controller.study;

import com.ssafy.learnway.domain.study.Study;
import com.ssafy.learnway.dto.study.StudyProvideRequestDto;
import com.ssafy.learnway.service.study.StudyService;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@Api(tags = {"study"})
@RestController
@Slf4j
@RequestMapping("/study")
public class StudyController {

    @Autowired
    private StudyService studyService;

    //날짜별 채팅내역 조회
    @ApiOperation(value = "학습 정보", notes = "날짜에 대한 학습 기록을 리턴한다.")
    @PostMapping("/day")
    public ResponseEntity list(@RequestBody @ApiParam(value = "학습 정보 (userId, date(선택한 날짜))", required = true) StudyProvideRequestDto studyProvideDto) throws SQLException {
        try {
//            log.info(studyProvideDto.toString());
            List<Study> studyList = studyService.selectStudyList(studyProvideDto);

            if(studyList.isEmpty() || studyList == null){
                return ResponseHandler.generateResponse("검색된 학습 목록이 없습니다.", HttpStatus.NOT_FOUND);
            }

            return ResponseHandler.generateResponse("검색된 날짜의 학습 목록입니다.", HttpStatus.OK, "studyList", studyList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("서버 오류입니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    //학습 기록
   
}
