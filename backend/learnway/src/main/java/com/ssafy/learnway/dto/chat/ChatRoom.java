package com.ssafy.learnway.dto.chat;

import com.ssafy.learnway.service.chat.ChatService;
import lombok.*;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
public class ChatRoom {
    // 채팅방
    // 입장한 클라이언트의 정보를 가지고 있는다.

    private String roomId;
//    private String name; //채팅방이름
    private Set<WebSocketSession> sessions = new HashSet<>();

    @Builder
    public ChatRoom(String roomId){
        this.roomId = roomId;
    }

    public void handleActions(WebSocketSession session, ChatMessage chatMessage, ChatService chatService ){
        //채팅방에는 연결과 대화하기 기능이 존재한다.
        if(chatMessage.getType().equals(ChatMessage.MessageType.ENTER)){
            //채팅방과 연결됨
            sessions.add(session);
//            chatMessage.setMessage(chatMessage.getSender() + "님 입장");
        }
        sendMessage(chatMessage, chatService); //채팅 보내기
    }

    public <T> void sendMessage(T message, ChatService chatService){
        sessions.parallelStream().forEach(session -> chatService.sendMessage(session,message));
    }
}