package com.ssafy.learnway.repository;


import com.ssafy.learnway.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository  extends JpaRepository<User, Long> {
    User findByUserEmail(String userEmail);
    User findByUserId(Long userId);

    User findByName(String name);

}
