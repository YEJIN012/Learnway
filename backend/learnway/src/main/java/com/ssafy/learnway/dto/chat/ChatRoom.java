package com.ssafy.learnway.dto.chat;

import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

/**
 * Redis 저장
 * key : roomId
 */
@Data
public class ChatRoom implements Serializable { //Redis에 저장할 때는 직렬화를 해야 한다.
    // 채팅방
    // 입장한 클라이언트의 정보를 가지고 있는다.
    private static final long serialVersionUID = 1L;

    private String roomId;
//    private String name; //채팅방이름 = 유저
//    private String img; // 유저 이미지
//    private long userId; // 유저 아이디
//    private int relationId; //serializable한 데이터 저장을 위해 dto

//    pub/sub방식을 이용하면 구독자 관리와 메시지 발송 구현도 알아서 해결
    public static ChatRoom create(){
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString(); //랜덤
//        chatRoom.relationId = relationId;
//        chatRoom.name = name;
        return chatRoom;
    }
}