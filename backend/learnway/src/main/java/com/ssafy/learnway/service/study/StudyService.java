package com.ssafy.learnway.service.study;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ssafy.learnway.domain.Language;
import com.ssafy.learnway.domain.study.Study;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.domain.user.UserInterest;
import com.ssafy.learnway.dto.interest.InterestDto;
import com.ssafy.learnway.dto.language.LanguageDto;
import com.ssafy.learnway.dto.study.StudyListRequestDto;
import com.ssafy.learnway.dto.study.StudyListResponseDto;
import com.ssafy.learnway.dto.study.StudyMonthResponseDto;
import com.ssafy.learnway.dto.study.StudyRecordRequestDto;
import com.ssafy.learnway.dto.user.ProfileDto;
import com.ssafy.learnway.repository.language.LanguageRepository;
import com.ssafy.learnway.repository.study.StudyRepository;
import com.ssafy.learnway.repository.user.UserInterestRepository;
import com.ssafy.learnway.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

@Slf4j
@Service
@RequiredArgsConstructor
public class StudyService {
  private final StudyRepository studyRepository;

  private final UserRepository userRepository;

  private final LanguageRepository languageRepository;

  private final UserInterestRepository userInterestRepository;

  @Value("${whisper.server.url}")
  private String whisperServerUri;

  public List<StudyListResponseDto> selectStudyList(StudyListRequestDto studyListRequestDto) throws Exception {
    // List<Study> studyList =
    // studyRepository.findAllByUserId(studyProvideRequestDto.getUserId());
    Date date = studyListRequestDto.getDate();
    User user = userRepository.findByUserEmail(studyListRequestDto.getUserEmail());
    List<Study> listAsUser = studyRepository.findAllByUserIdAndCreatedDate(user, date);
    List<Study> listAsFriend = studyRepository.findAllByFriendIdAndCreatedDate(user, date);

    List<StudyListResponseDto> studyList = new ArrayList<>();
    for (Study study : listAsUser) {
      // lazy
      LanguageDto languageDto = LanguageDto.builder()
          .languageId(study.getFriendLanguageId().getLanguageId())
          .code(study.getFriendLanguageId().getLanguageCode())
          .name(study.getFriendLanguageId().getLanguageName())
          .build();

      ProfileDto profileDto = getProfile(study.getFriendId());

      StudyListResponseDto response = StudyListResponseDto.builder().videoId(study.getVideoId())
          .userId(study.getFriendId().getUserId())
          .script(study.getScript())
          .createdDate(study.getCreatedDate())
          .language(languageDto)
          .profileDto(profileDto)
          .build();

      studyList.add(response);
    }

    for (Study study : listAsFriend) {
      // lazy
      LanguageDto languageDto = LanguageDto.builder()
              .languageId(study.getUserLanguageId().getLanguageId())
              .code(study.getUserLanguageId().getLanguageCode())
              .name(study.getUserLanguageId().getLanguageName())
              .build();

      ProfileDto profileDto = getProfile(study.getUserId());

      StudyListResponseDto response = StudyListResponseDto.builder().videoId(study.getVideoId())
              .userId(study.getUserId().getUserId())
              .script(study.getScript())
              .createdDate(study.getCreatedDate())
              .language(languageDto)
              .profileDto(profileDto)
              .build();

      studyList.add(response);
    }

    return studyList;
  }

  @Transactional
  @Async
  public void insertStudy(StudyRecordRequestDto studyRecordRequestDto, String recordUrl)
      throws SQLException, URISyntaxException, UnsupportedEncodingException {
    User user = userRepository.findByUserEmail(studyRecordRequestDto.getUserEmail());
    User friend = userRepository.findByUserEmail(studyRecordRequestDto.getFriendEmail());
    Language userLanguage = languageRepository.findByLanguageId(studyRecordRequestDto.getUserLanguageId());
    Language friendLanguage = languageRepository.findByLanguageId(studyRecordRequestDto.getFriendLanguageId());

    String encodedUrl = URLEncoder.encode(recordUrl);
    HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
    requestFactory.setReadTimeout(0);
    requestFactory.setConnectTimeout(0);
    RestTemplate restTemplate = new RestTemplate(requestFactory);
    String requestURL = whisperServerUri + "?audio_url={audio_url}";

    String script = restTemplate.getForObject(requestURL, String.class, encodedUrl);
    System.out.println(encodedUrl);
    Study study = Study.builder()
        .userId(user)
        .friendId(friend)
        .userLanguageId(userLanguage)
        .friendLanguageId(friendLanguage)
        .script(script)
        .build();

    if (studyRepository.save(study) == null) { // 학습기록
      throw new SQLException();
    }
  }

  public List<StudyMonthResponseDto> selectStudyMonthList(User user, Date month) throws Exception {
    // User user = userRepository.findByUserEmail(userEmail);
    return studyRepository.selectByUserIdAndMonth(user, month);
  }

  @Transactional(readOnly = true)
  public ProfileDto getProfile(User user) {

    LanguageDto languageDto = LanguageDto.builder()
        .languageId(user.getLanguageId().getLanguageId())
        .code(user.getLanguageId().getLanguageCode())
        .name(user.getLanguageId().getLanguageName())
        .build();

    List<UserInterest> userInterests = userInterestRepository.findAllByUserId(user);

    List<InterestDto> interests = new ArrayList<>();
    for (UserInterest userInterest : userInterests) {
      InterestDto interestDto = InterestDto.builder()
          .interestId(userInterest.getInterestId().getInterestId())
          .field(userInterest.getInterestId().getField()).build();
      interests.add(interestDto);
    }

    return ProfileDto.builder()
        .userEmail(user.getUserEmail())
        .name(user.getName())
        .birthDay(user.getBirthday())
        .language(languageDto)
        .interests(interests)
        .imgUrl(user.getImgUrl())
        .bio(user.getBio()).build();
  }
}
