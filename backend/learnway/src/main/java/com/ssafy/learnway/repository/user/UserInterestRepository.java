package com.ssafy.learnway.repository.user;

import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.domain.user.UserInterest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserInterestRepository extends JpaRepository<UserInterest, Integer> {
    List<UserInterest> findAllByUserId(User userId);

    void deleteAllByUserId(User user);
}
