package com.ssafy.learnway.service.study;

import com.ssafy.learnway.domain.study.Study;
import com.ssafy.learnway.dto.study.StudyProvideRequestDto;
import com.ssafy.learnway.repository.study.StudyRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class StudyService {

    @Autowired
    private StudyRepository studyRepository;

    public List<Study> selectStudyList(StudyProvideRequestDto studyProvideRequestDto) throws Exception{
        List<Study> studyList = studyRepository.findAllByUserIdAndStudyDateTime(studyProvideRequestDto.getUserId(), studyProvideRequestDto.getDate());
        return studyList;
    }

}
