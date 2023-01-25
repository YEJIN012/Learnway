package com.ssafy.learnway.repository;

import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.domain.user.UserInterest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInterestRepository extends JpaRepository<UserInterest, Long> {

}
