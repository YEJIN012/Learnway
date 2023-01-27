package com.ssafy.learnway.exception;

public class DuplicateNameException extends RuntimeException{
    public DuplicateNameException(){
        super("닉네임 중복 과정 중 오류 발생");
    }
}
