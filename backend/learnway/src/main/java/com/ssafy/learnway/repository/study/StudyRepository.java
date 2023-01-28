package com.ssafy.learnway.repository.study;

import com.ssafy.learnway.domain.study.Study;
import com.ssafy.learnway.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Integer> {
//    List<Study> findAllByStudyDatetime(@Param("study_datetime") LocalDateTime regTime);
    @Query("SELECT u FROM Study u WHERE u.userId = :user_id AND DATE_FORMAT(u.studyDatetime, '%Y-%m-%d') = DATE_FORMAT(:date, '%Y-%m-%d')")
    List<Study> findAllByUserIdAndStudyDatetime(@Param("user_id") User user, @Param("date") Date date);
}
