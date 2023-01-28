package com.ssafy.learnway.service.study;

import com.ssafy.learnway.domain.study.Study;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.study.StudyListRequestDto;
import com.ssafy.learnway.dto.study.StudyListResponseDto;
import com.ssafy.learnway.repository.UserRepository;
import com.ssafy.learnway.repository.study.StudyRepository;
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

    public List<StudyListResponseDto> selectStudyList(StudyListRequestDto studyListRequestDto) throws Exception{
//        List<Study> studyList = studyRepository.findAllByUserId(studyProvideRequestDto.getUserId());
        Date date = studyListRequestDto.getDate();
        User user = userRepository.findByUserEmail(studyListRequestDto.getUserEmail());
        List<Study> list = studyRepository.findAllByUserIdAndStudyDatetime(user, date);

        List<StudyListResponseDto> studyList = new ArrayList<>();
        for(Study study : list){
            StudyListResponseDto response = StudyListResponseDto.builder().videoId(study.getVideoId())
                    .userId(study.getUserId().getUserId())
                    .friendId(study.getFriendId().getUserId())
                    .script(study.getScript())
                    .studyDatetime(study.getStudyDatetime())
                    .languageId(study.getLanguageId())
                    .build();

            studyList.add(response);
        }

        return studyList;
    }

}
