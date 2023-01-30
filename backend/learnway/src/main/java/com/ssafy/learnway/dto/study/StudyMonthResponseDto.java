package com.ssafy.learnway.dto.study;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

//@Data
//월별 기록 (date, count)
public interface StudyMonthResponseDto {

    String getMonthDate();
    Integer getCount();
//    Date startDate;
//    Integer cnt;
//
//    public StudyMonthResponseDto(Date startDate, Integer cnt) {
//        this.startDate = startDate;
//        this.cnt = cnt;
//    }
}
