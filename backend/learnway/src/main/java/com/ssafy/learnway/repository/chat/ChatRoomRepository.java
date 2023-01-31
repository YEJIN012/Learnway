package com.ssafy.learnway.repository.chat;

import com.ssafy.learnway.dto.chat.ChatMessage;
import com.ssafy.learnway.dto.chat.ChatRoom;
import com.ssafy.learnway.service.chat.MessageMaxLength;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ChatRoomRepository {


    // Redis 키
    private static final String CHAT_ROOMS = "CHAT_ROOM"; // 채팅룸 저장
    public static final String ENTER_INFO = "ENTER_INFO"; // 채팅룸에 입장한 클라이언트의 sessionId와 채팅룸 id를 맵핑한 정보 저장
    public static final String CHAT_LIST = "CHAT_LIST"; // 채팅룸 최근 메시지 내역
    public static final String ROOM_TTL = "ROOM_TTL"; // room 삭제

    @Resource(name = "redisTemplate")
    private HashOperations<String, String, ChatRoom> hashOpsChatRoom; // 채팅방 ("CHAT_ROOM", 방 id, chatroom 객체)
    @Resource(name = "redisTemplate")
    private HashOperations<String, String, String> hashOpsEnterInfo;
    @Resource(name = "redisTemplate")
    private ValueOperations<String, String> valueOps;
    @Resource(name = "redisTemplate")
    private HashOperations<String, String, List<ChatMessage>> roomMessages; // 최근 메시지 저장용

    @Autowired
    // 모든 채팅방 조회
    public List<ChatRoom> findAllRoom() {
        return hashOpsChatRoom.values(CHAT_ROOMS);
    }

    // 특정 채팅방 조회
    public ChatRoom findRoomById(String id) {
        return hashOpsChatRoom.get(CHAT_ROOMS, id);
    }

    // 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
    public ChatRoom createChatRoom() {
        ChatRoom chatRoom = ChatRoom.create();
        hashOpsChatRoom.put(CHAT_ROOMS, chatRoom.getRoomId(), chatRoom);
        return chatRoom;
    }

    // 채팅방 삭제 : redis hash에 저장된 채팅방 파괴
    public void deleteChatRoom(String roomId) {
        // 채팅방 정보 삭제
        hashOpsChatRoom.delete(CHAT_ROOMS, roomId);
        // 채팅방 메시지 삭제
        roomMessages.delete(CHAT_LIST, roomId);

        // hashOpsEnterInfo(채팅방 유저 정보)에서 채팅방 ID를 value으로 가지는 key를 삭제
//        Map<String, ChatUserInfo> entries = hashOpsEnterInfo.entries(ENTER_INFO);
//        for (Map.Entry<String, ChatUserInfo> stringStringEntry : entries.entrySet()) {
//            if (stringStringEntry.getValue().getRoomId().equals(roomId)) {
//                hashOpsEnterInfo.delete(ENTER_INFO, stringStringEntry.getKey());
//            }
//        }
    }

    // 유저가 입장한 채팅방ID와 유저 세션ID 맵핑 정보 저장
    public void setUserEnterInfo(String sessionId, String roomId) {
        hashOpsEnterInfo.put(ENTER_INFO, sessionId, roomId);
    }

    // 유저 세션으로 입장해 있는 채팅방 ID 조회
    public String getUserEnterRoomId(String sessionId) {
        return hashOpsEnterInfo.get(ENTER_INFO, sessionId);
    }

    // 유저 세션정보와 맵핑된 채팅방ID 삭제
    public void removeUserEnterInfo(String sessionId) {
        hashOpsEnterInfo.delete(ENTER_INFO, sessionId);
    }

    // 메시지 저장
    public void saveMessage(String roomId, ChatMessage message) {
        List<ChatMessage> messages = roomMessages.get(CHAT_LIST, roomId);
        if(messages == null) messages = new ArrayList<>();
        messages.add(message);

        if(messages.size() > MessageMaxLength.MESSAGE_MAX_LENGTH){
            List<ChatMessage> changeMessages = new ArrayList<>(messages.subList(1, MessageMaxLength.MESSAGE_MAX_LENGTH));

            roomMessages.put(CHAT_LIST, roomId, changeMessages);
            return;
        }
        roomMessages.put(CHAT_LIST, roomId, messages);
    }

    // 저장 메시지 보내기
    public List<ChatMessage> getMessages(String roomId) {
        List<ChatMessage> messages = roomMessages.get(CHAT_LIST, roomId);
        if(messages == null) return new ArrayList<>();
        return messages;
    }

}
