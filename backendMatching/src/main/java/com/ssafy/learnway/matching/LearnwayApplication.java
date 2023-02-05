package com.ssafy.learnway.matching;

import com.ssafy.learnway.matching.algorithm.MatchingAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class LearnwayApplication {

	@Autowired
	MatchingAlgorithm matchingAlgorithm;
	public static void main(String[] args) {

		SpringApplication.run(LearnwayApplication.class, args);

	}

}
