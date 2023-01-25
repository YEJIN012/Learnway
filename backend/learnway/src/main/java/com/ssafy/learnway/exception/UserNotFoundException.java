package com.ssafy.learnway.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(){
        super("유저를 못 찾았습니다.");
    }
}
