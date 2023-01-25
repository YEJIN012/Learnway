package com.ssafy.learnway.exception;

import com.ssafy.learnway.util.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(Exception.class)
    //@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ResponseEntity defaultException(HttpServletRequest request, Exception e){
        return ResponseHandler.generateResponse("실패하였습니다",HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
