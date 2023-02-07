package com.ssafy.learnway;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication // Exclude the automatic configuration of JACKSON
@OpenAPIDefinition(servers = {@Server(url = "/", description = "Default Server URL")})
//@EnableAutoConfiguration의 exclude 속성을 이용해서 SecurityAutoConfiguration 잠시 중지 가능
// @EnableAutoConfiguration(exclude = {SecurityAutoConfiguration.class})
public class LearnwayApplication {

	public static void main(String[] args) {
		SpringApplication.run(LearnwayApplication.class, args);
	}

}
