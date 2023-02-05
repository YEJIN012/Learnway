package com.ssafy.learnway.controller.chat;

import com.ssafy.learnway.domain.friend.Room;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.chat.ChatMessage;
import com.ssafy.learnway.repository.chat.ChatRoomRepository;
import com.ssafy.learnway.service.user.UserService;
import com.ssafy.learnway.service.chat.ChatService;
import com.ssafy.learnway.service.friend.RoomService;
import com.ssafy.learnway.util.JwtTokenProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins="*")
@RestController
public class ChatController {

    private final JwtTokenProvider jwtTokenProvider;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatService chatService;
    private final UserService userService;
    private final RoomService roomService;
    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @ApiOperation(value = "message, token(헤더)", notes = "/pub/chat/message로 들어오는 메시징을 처리한다.")
    @MessageMapping("/chat/message")
    public void message(ChatMessage message, @Header("X-AUTH-TOKEN") String token) throws SQLException { //헤더에 토큰을 담아서 보낸다.
        Long userId = jwtTokenProvider.getUserIdFromJwt(token.toString()); //access token payload 안에 있는 토큰을 가져오다.
        Optional<User> userOp = Optional.ofNullable(userService.findById(userId));
        log.info("ChatController : userId ",userId);

        if(userOp.isPresent()) { // 객체가 존재하는가
            User user = userOp.get();
            String nickname = user.getUsername();

            // 로그인 회원 정보로 대화명 설정
            message.setSender(nickname);

//            String imgUrl = user.getImgUrl();
//            message.setImgUrl(imgUrl);

            // Websocket에 발행된 메시지를 redis로 발행(publish)
            chatService.sendChatMessage(message);

            // 발행한 메시지 저장
            chatRoomRepository.saveMessage(message.getRoomId(), message);

            // Room 최신 메시지 전송시간과 최근 메시지 내용 갱신
            Room room = roomService.findByRoomId(message.getRoomId());

            roomService.updateByRoom(room, message);
        }
    }
}
