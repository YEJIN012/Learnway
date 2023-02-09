package com.ssafy.learnway.exception;

import com.ssafy.learnway.util.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.AccessDeniedException;

@RequiredArgsConstructor
@RestControllerAdvice
public class ExceptionAdvice {

//    @ExceptionHandler(Exception.class)
//    //@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    protected ResponseEntity defaultException(HttpServletRequest request, Exception e){
//        return ResponseHandler.generateResponse("실패하였습니다",HttpStatus.INTERNAL_SERVER_ERROR);
//    }

    @ExceptionHandler(DuplicateNameException.class)
    //@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ResponseEntity duplicateNameException(HttpServletRequest request, DuplicateNameException e){
        return ResponseHandler.generateResponse("닉네임 중복 과정 중 오류 발생",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(TokenValidFailedException.class)
    //@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ResponseEntity tokenValidFailedException(HttpServletRequest request, TokenValidFailedException e){
        return ResponseHandler.generateResponse("토근 생성 중 오류 발생",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UserNotFoundException.class)
    //@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ResponseEntity userNotFoundException(HttpServletRequest request, UserNotFoundException e){
        return ResponseHandler.generateResponse("유저를 못 찾음",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(S3FileUploadException.class)
    protected ResponseEntity s3FileUploadException(HttpServletRequest request, UserNotFoundException e){
        return ResponseHandler.generateResponse("S3 파일 저장 중 오류 발생",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(CAuthenticationEntryPointException.class)
    protected ResponseEntity cAuthenticationEntryPointException(HttpServletRequest request, UserNotFoundException e){
        return ResponseHandler.generateResponse("유효하지 않은 token입니다.", HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    protected ResponseEntity accessDeniedException(HttpServletRequest request, UserNotFoundException e){
        return ResponseHandler.generateResponse("권한이 없습니다.", HttpStatus.FORBIDDEN);
    }
}
