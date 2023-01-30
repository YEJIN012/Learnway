package com.ssafy.learnway.dto.chat;

import com.ssafy.learnway.service.chat.ChatService;
import lombok.*;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
public class ChatRoom {
    // 채팅방
    // 입장한 클라이언트의 정보를 가지고 있는다.

    private String roomId;
//    private String name; //채팅방이름

//    pub/sub방식을 이용하면 구독자 관리와 메시지 발송 구현도 알아서 해결
    public static ChatRoom create(){
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        return chatRoom;
    }
}