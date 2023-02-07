package com.ssafy.learnway.controller.conversation;

import com.ssafy.learnway.dto.conversation.ConvTransDto;
import com.ssafy.learnway.service.conversation.CrawingService;
import com.ssafy.learnway.service.conversation.TransService;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

@Tag( name= "conversation")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/conv")
public class ConversationController {
    private final CrawingService crawingService;

    private final TransService transService;

    @Operation(summary = "오늘의 회화", description = "본인의 언어와 학습언어를 파라미터에 넘긴다. 본인의 언어와 학습 언어에 대한 오늘의 회화 데이터를 리턴한다.")
    @GetMapping
    public ResponseEntity list(@RequestParam(name = "lng") String lng, @RequestParam(name = "study_lng") String studyLng) throws SQLException {
        try {
            LocalDate date = LocalDate.now();

            // 네이버 오늘의 회화에서 일요일에는 회화를 제공하지 않는다.
//            DayOfWeek dayOfWeek  = date.getDayOfWeek();
            
            /////// 해커스로 진행

            List<String> sentences = crawingService.crawling(date);

            if(sentences.size() == 0 || sentences == null){
                return ResponseHandler.generateResponse("오늘의 회화가 없습니다", HttpStatus.NO_CONTENT);
            }

            /// 본인의 언어와 학습 언어로 번역
            ConvTransDto convTransDto = transService.getTransSentence(sentences, lng, studyLng);

            if(convTransDto == null){
                return ResponseHandler.generateResponse("번역할 수 없는 언어입니다.", HttpStatus.NO_CONTENT);
            }

            return ResponseHandler.generateResponse("오늘의 회화", HttpStatus.OK,"conversation",convTransDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("서버 오류입니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
