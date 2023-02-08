package com.ssafy.learnway.util;

import com.ssafy.learnway.repository.chat.ChatRoomRepository;
import com.ssafy.learnway.service.chat.ChatService;
import com.ssafy.learnway.service.matching.MatchingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Configuration
@Component
public class StompHandler implements ChannelInterceptor {

    private final JwtTokenProvider jwtTokenProvider;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatService chatService;

    private final MatchingService matchingService;


    /**
     * interceptor 역할
     * Websocket 요청 처리 전에 제일 먼저 실행된다.
     * stomp 웹 소켓 연결시 토큰 검증을 통해 연결 성공/실패 여부 할수 있게 구현.
     */
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT == accessor.getCommand()) { // websocket 연결 요청이 들어옴
            String jwtToken = accessor.getFirstNativeHeader("X-AUTH-TOKEN");

            if(jwtToken != null) {
                // Header의 jwt token 검증
                jwtTokenProvider.validateToken(jwtToken);
            }

        } else if (StompCommand.SUBSCRIBE == accessor.getCommand()) { // 채팅룸 구독요청 (pub)

            // header에서  구독 destination 정보를 얻고, roomId를 추출한다.
            String roomId = chatService.getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));

            log.info(roomId);
            String[] sp = roomId.split("-");

            // 채팅방에 들어온 클라이언트 sessionId를 roomId와 맵핑해 놓는다.(나중에 특정 세션이 어떤 채팅방에 들어가 있는지 알기 위함)
            String sessionId = (String) message.getHeaders().get("simpSessionId");

            if(sp.length == 2){
                matchingService.addMatchingUser(roomId,sessionId);
            }else{
                chatRoomRepository.setUserEnterInfo(sessionId, roomId);
            }

        } else if (StompCommand.DISCONNECT == accessor.getCommand()) { // Websocket 연결 종료 (친구 끊기)

            String sessionId = (String) message.getHeaders().get("simpSessionId");

            // 퇴장한 클라이언트의 roomId 맵핑 정보를 삭제한다.
            chatRoomRepository.removeUserEnterInfo(sessionId);
        }

        return message;
    }
}