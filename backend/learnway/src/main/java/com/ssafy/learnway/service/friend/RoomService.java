package com.ssafy.learnway.service.friend;

import com.ssafy.learnway.domain.friend.Friend;
import com.ssafy.learnway.domain.friend.Room;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.user.ProfileDto;
import com.ssafy.learnway.dto.chat.ChatMessage;
import com.ssafy.learnway.dto.friend.RoomDto;
import com.ssafy.learnway.repository.chat.ChatRoomRepository;
import com.ssafy.learnway.repository.friend.RoomRepository;
import com.ssafy.learnway.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static java.time.LocalDateTime.now;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    private final UserService userService;
    private final ChatRoomRepository chatRoomRepository;

    @Transactional
    public Room createRoom(Friend friend, String roomId){
        Room room = Room.builder().friend(friend).roomId(roomId).msg("").time(now()).build();
        return roomRepository.save(room);
    }

    @Transactional
    public Room findByRelationId(Friend relationId) {
        return roomRepository.findByRelationId(relationId.getRelationId());
    }

    @Transactional
    public void deleteByRoomId(String roomId){
        chatRoomRepository.deleteChatRoom(roomId); //redis
        roomRepository.deleteByRoomId(roomId);
    }

    public Room findByRoomId(String roomId){
        return roomRepository.findByRoomId(roomId);
    }

    @Transactional
    public void updateByRoom(Room room, ChatMessage message){
        room.updateRoom(message.getRegTime(), message.getMessage());
        roomRepository.save(room); // 최근 메시지 정보 업데이트
    }
}
