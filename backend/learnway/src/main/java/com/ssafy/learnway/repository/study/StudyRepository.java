package com.ssafy.learnway.repository.study;

import com.ssafy.learnway.domain.study.Study;
import com.ssafy.learnway.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Integer> {
    List<Study> findAllByUserIdAndStudyDateTime(@Param("user_id") User userId , @Param("study_datetime")Date regDate);
}
