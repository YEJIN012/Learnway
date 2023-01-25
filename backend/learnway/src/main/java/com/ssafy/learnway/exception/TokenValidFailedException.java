package com.ssafy.learnway.exception;

public class TokenValidFailedException extends RuntimeException{
    public TokenValidFailedException(){
        super("토근 생성 실패하였습니다.");
    }
}
