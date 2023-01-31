package com.ssafy.learnway.controller.chat;

import com.ssafy.learnway.domain.friend.Friend;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.chat.ChatMessage;
import com.ssafy.learnway.dto.chat.ChatRoom;
import com.ssafy.learnway.dto.friend.FriendDto;
import com.ssafy.learnway.repository.chat.ChatRoomRepository;
import com.ssafy.learnway.service.FriendService;
import com.ssafy.learnway.service.UserService;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

/**
 * STOMP 라이브러리를 이용해서 subscribe(구독자) 구현
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;

    private final FriendService friendService;

    private final UserService userService;

    // 모든 채팅방 목록 반환
    @GetMapping("/room/{userEmail}")
    public List<ChatRoom> rooms(@PathVariable String userEmail) throws SQLException {
        User user = userService.findByEmail(userEmail);
        List<ChatRoom> chatRooms = chatRoomRepository.findAllRoom(user.getUserId());
        return chatRooms;
    }

    // 채팅방 생성
    @PostMapping("/room")
    public ChatRoom createRoom(@RequestBody @ApiParam(value = "내 이메일, 채팅 걸 친구 이메일", required = true) FriendDto friendDto) throws SQLException {
        User user = userService.findByEmail(friendDto.getUserEmail());
        User opponent = userService.findByEmail(friendDto.getFriendEmail());
        Friend friend = friendService.findById(user,opponent);

        return chatRoomRepository.createChatRoom(friend);
    }

    // 채팅방 파괴
    @DeleteMapping("/room/{roomId}")
    public ResponseEntity deleteRoom(@PathVariable String roomId) {
        chatRoomRepository.deleteChatRoom(roomId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    // 특정 채팅방 들어갔을때 채팅방 관련 정보를 전달
    @GetMapping("/room/{roomId}")
    public ChatRoom roomInfo(@PathVariable String roomId) {
        return chatRoomRepository.findRoomById(roomId);
    }

    // 해당 채팅방에 저장된 최신 메시지 받기
    @GetMapping("/room/message/{roomId}")
    @ResponseBody
    public List<ChatMessage> getMessages(@PathVariable String roomId) {
        return chatRoomRepository.getMessages(roomId);
    }

}