package com.ssafy.learnway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
//@EnableAutoConfiguration의 exclude 속성을 이용해서 SecurityAutoConfiguration 잠시 중지 가능
@EnableAutoConfiguration(exclude = {SecurityAutoConfiguration.class})
public class LearnwayApplication {

	public static void main(String[] args) {
		SpringApplication.run(LearnwayApplication.class, args);
	}

}
