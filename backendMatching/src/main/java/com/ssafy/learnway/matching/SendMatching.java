package com.ssafy.learnway.matching;

import com.ssafy.learnway.dto.matching.MatchingResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
public class SendMatching {
    final String url = "http://localhost:8080/matching/result";

    public void sendMatching(MatchingResponseDto matchingResponseDto) {

        log.info("send main server : "+matchingResponseDto.toString());
        RestTemplate restTemplate = new RestTemplate();

        // JSON 데이터로 요청할 것이므로 APPLICATION_JSON 설정
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        // header와 body 설정
        HttpEntity<?> requestMessage = new HttpEntity<>(matchingResponseDto, httpHeaders);

        // post 요청
        ResponseEntity<MatchingResponseDto> response = restTemplate.postForEntity(url, requestMessage, MatchingResponseDto.class);

        log.info("send main server statusCode: {}", response.getStatusCode());
    }

}
