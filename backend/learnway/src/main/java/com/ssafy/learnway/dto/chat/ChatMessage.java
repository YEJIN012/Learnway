package com.ssafy.learnway.dto.chat;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class ChatMessage implements Serializable { // 채팅 메시지 포맷

    private static final long serialVersionUID = 1L;

    public enum MessageType{
        ENTER, TALK, QUIT
    }

    private MessageType type;
    private String roomId;
    private String sender; // 메시지 보낸 사람
//    private String receiver; // 받는 사람
    private String message; //내용

//    @CreatedDate
//    private LocalDateTime regTime; //보낸 시간

}
