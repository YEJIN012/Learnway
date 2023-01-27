package com.ssafy.learnway.repository;

import com.ssafy.learnway.domain.Interest;
import com.ssafy.learnway.domain.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterestRepository  extends JpaRepository<Interest, Integer> {
}
