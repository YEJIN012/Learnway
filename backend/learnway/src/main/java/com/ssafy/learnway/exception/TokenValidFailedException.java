package com.ssafy.learnway.exception;

public class TokenValidFailedException extends RuntimeException{
    public TokenValidFailedException(){
        super("토근 오류 발생");
    }
}
