package com.ssafy.learnway.repository.study;

import com.ssafy.learnway.domain.study.Study;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.study.StudyMonthResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Integer> {
//    List<Study> findAllByStudyDatetime(@Param("study_datetime") LocalDateTime regTime);
    @Query("SELECT u FROM Study u WHERE u.userId = :user_id AND DATE_FORMAT(u.createdDate, '%Y-%m-%d') = DATE_FORMAT(:date, '%Y-%m-%d')")
    List<Study> findAllByUserIdAndCreatedDate(@Param("user_id") User user, @Param("date") Date date);

    @Query("SELECT u FROM Study u WHERE u.friendId = :friend_id AND DATE_FORMAT(u.createdDate, '%Y-%m-%d') = DATE_FORMAT(:date, '%Y-%m-%d')")
    List<Study> findAllByFriendIdAndCreatedDate(@Param("friend_id") User friend, @Param("date") Date date);

    //nativeQuery 문으로 작성 - sql
    //조회달에 대한 일수와 해당 일수의 학습개수 리턴
    //dto로 선택된 열만 반환하기 때문에 interface로 선언
    @Query(value="with recursive T as (\n" +
            "    select last_day(:study_month - interval 1 month) + interval 1 day as startDate" +
            "    union all" +
            "    select startDate + interval 1 day from T where startDate < last_day(:study_month)" +
            ")," +
            "U as(" +
            "   select DATE_FORMAT(created_date, '%Y-%m-%d') as studyDate, count(*) as cnt from `tb_study`" +
            "where user_id=:user_id and DATE_FORMAT(`created_date`, '%Y-%m') = DATE_FORMAT(:study_month, '%Y-%m')" +
            "group by DATE_FORMAT(created_date, '%Y-%m-%d')" +
            ")" +
            "select DATE_FORMAT(t.startDate, '%Y-%m-%d') as monthDate, ifnull(u.cnt,0) as count from T t left join U u on DATE_FORMAT(u.studyDate, '%Y-%m-%d') = DATE_FORMAT(t.startDate, '%Y-%m-%d')"
            , nativeQuery = true)
    List<StudyMonthResponseDto> selectByUserIdAndMonth(@Param("user_id") User userId, @Param("study_month") Date studyMonth);
}
