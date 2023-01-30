package com.ssafy.learnway.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.learnway.dto.chat.ChatMessage;
import com.ssafy.learnway.dto.chat.ChatRoom;
import com.ssafy.learnway.service.chat.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.w3c.dom.Text;

@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final ChatService chatService;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        //클라이언트로부터 메시지를 "전달받아" 메시지 객체로 변환한다.
        String payload = message.getPayload(); // 메시지를 받음
        log.info("payload : {}, payload");

        ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class); // 메시지를 객체로 변환함
        ChatRoom room = chatService.findRoomById(chatMessage.getRoomId()); //해당 메시지를 보낼 채팅방을 찾는다.
        room.handleActions(session, chatMessage, chatService);

    }
}
