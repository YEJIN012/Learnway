package com.ssafy.learnway.controller;

import com.ssafy.learnway.util.ResponseHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/exception")
public class ExceptionController {

    @GetMapping("/entrypoint")
    public ResponseEntity entrypointException(){
        return ResponseHandler.generateResponse("유효하지 않은 token입니다.", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/accessDenined")
    public ResponseEntity accessDeninedException(){
        return ResponseHandler.generateResponse("권한이 없습니다.", HttpStatus.BAD_REQUEST);
    }

}
