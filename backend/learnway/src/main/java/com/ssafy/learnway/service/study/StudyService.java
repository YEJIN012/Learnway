package com.ssafy.learnway.service.study;

import com.ssafy.learnway.domain.study.Study;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.study.StudyProvideRequestDto;
import com.ssafy.learnway.repository.UserRepository;
import com.ssafy.learnway.repository.study.StudyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
//@RequiredArgsConstructor
public class StudyService {
    @Autowired
    private StudyRepository studyRepository;

    @Autowired
    private UserRepository userRepository;
//    private final StudyRepository studyRepository;

    public List<Study> selectStudyList(StudyProvideRequestDto studyProvideRequestDto) throws Exception{
//        List<Study> studyList = studyRepository.findAllByUserId(studyProvideRequestDto.getUserId());
        Date date = studyProvideRequestDto.getDate();
        User user = userRepository.findByUserId(studyProvideRequestDto.getUserId());
        List<Study> studyList = studyRepository.findAllByUserIdAndStudyDatetime(user, date);
        return studyList;
    }

}
