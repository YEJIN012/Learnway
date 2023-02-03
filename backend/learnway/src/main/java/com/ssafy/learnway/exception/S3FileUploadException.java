package com.ssafy.learnway.exception;

import java.io.IOException;

public class S3FileUploadException extends RuntimeException {
    public S3FileUploadException(){
        super("S3 파일 저장 중 오류 발생");
    }

}
