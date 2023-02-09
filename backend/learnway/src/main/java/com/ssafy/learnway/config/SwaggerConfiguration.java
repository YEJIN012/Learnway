package com.ssafy.learnway.config;

import io.swagger.v3.oas.models.OpenAPI;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class SwaggerConfiguration {
    // http://localhost:8080/swagger-ui/index.html
    @Bean
    public GroupedOpenApi server() {
        return GroupedOpenApi.builder()
                .group("server")
                .pathsToMatch("/**")
                .build();
    }
//    @Bean
//    public GroupedOpenApi apiServer() {
//        return GroupedOpenApi.builder()
//                .group("learnway-api")
//                .pathsToMatch("/api/**")
//                .build();
//    }

    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI();
    }
}
