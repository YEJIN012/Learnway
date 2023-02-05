package com.ssafy.learnway.dto.chat;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class ChatMessage implements Serializable { // 채팅 메시지 포맷

    public enum MessageType{
        ENTER, TALK, QUIT
    }

    private MessageType type;
    private String roomId;
    private String sender; // 메시지 보낸 사람
//    private String receiver; // 받는 사람
    private String message; //내용
    private LocalDateTime regTime; //보낸 시간

}
