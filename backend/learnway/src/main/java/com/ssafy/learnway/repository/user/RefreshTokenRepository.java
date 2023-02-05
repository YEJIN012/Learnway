package com.ssafy.learnway.repository.user;

import com.ssafy.learnway.domain.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {
    RefreshToken findByUserKey(Long UserKey);
}
