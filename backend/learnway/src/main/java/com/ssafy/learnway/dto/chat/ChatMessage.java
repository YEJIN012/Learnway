package com.ssafy.learnway.dto.chat;

import lombok.*;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage { // 채팅 메시지 포맷

    public enum MessageType{
        ENTER, TALK
    }

    private MessageType type;
    private String roomId;
    private String sender; // 메시지 보낸 사람
//    private String receiver; // 받는 사람
    private String message; //내용

}
