package com.ssafy.learnway.service.study;

import com.ssafy.learnway.domain.Language;
import com.ssafy.learnway.domain.study.Study;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.study.StudyListRequestDto;
import com.ssafy.learnway.dto.study.StudyListResponseDto;
import com.ssafy.learnway.dto.study.StudyRecordRequestDto;
import com.ssafy.learnway.repository.LanguageRepository;
import com.ssafy.learnway.repository.UserRepository;
import com.ssafy.learnway.repository.study.StudyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class StudyService {
    private final StudyRepository studyRepository;

    private final UserRepository userRepository;

    private final LanguageRepository languageRepository;

    public List<StudyListResponseDto> selectStudyList(StudyListRequestDto studyListRequestDto) throws Exception{
//        List<Study> studyList = studyRepository.findAllByUserId(studyProvideRequestDto.getUserId());
        Date date = studyListRequestDto.getDate();
        User user = userRepository.findByUserEmail(studyListRequestDto.getUserEmail());
        List<Study> list = studyRepository.findAllByUserIdAndCreatedDate(user, date);

        List<StudyListResponseDto> studyList = new ArrayList<>();
        for(Study study : list){
            StudyListResponseDto response = StudyListResponseDto.builder().videoId(study.getVideoId())
                    .userId(study.getUserId().getUserId())
                    .friendId(study.getFriendId().getUserId())
                    .script(study.getScript())
                    .createdDate(study.getCreatedDate())
                    .languageId(study.getLanguageId())
                    .build();

            studyList.add(response);
        }

        return studyList;
    }

    @Transactional
    public void insertStudy(StudyRecordRequestDto studyRecordRequestDto) throws SQLException {
        User user = userRepository.findByUserEmail(studyRecordRequestDto.getUserEmail());
        User friend = userRepository.findByUserEmail(studyRecordRequestDto.getFriendEmail());
        Language language = languageRepository.findByLanguageId(studyRecordRequestDto.getLanguageId());

        Study study = Study.builder().userId(user)
                .friendId(friend)
                .languageId(language)
                .script(studyRecordRequestDto.getScript())
                .build();

        if(studyRepository.save(study) == null){ //학습기록
            throw new SQLException();
        }
    }

}
