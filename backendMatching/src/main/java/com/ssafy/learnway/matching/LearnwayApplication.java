package com.ssafy.learnway.matching;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling // 매칭 서버는 주기적으로 매칭을 확인
public class LearnwayApplication {

	public static void main(String[] args) {

		SpringApplication.run(LearnwayApplication.class, args);

	}

}
