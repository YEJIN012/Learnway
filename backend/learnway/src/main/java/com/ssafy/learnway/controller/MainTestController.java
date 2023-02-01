package com.ssafy.learnway.controller;

import com.ssafy.learnway.dto.UserDto;
import com.ssafy.learnway.util.ResponseHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainTestController {
    @GetMapping("/main")
    public String main() {

        return "메인페이지 확인용";

    }
}
