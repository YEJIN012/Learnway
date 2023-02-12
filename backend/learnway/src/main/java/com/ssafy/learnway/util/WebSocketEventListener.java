package com.ssafy.learnway.util;

import com.ssafy.learnway.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketEventListener {

    private static final String EXCAHGE_NAME = "learnway.exchange";
    private static String routingKey = "learnway.bad.routing.#";
    private final RabbitTemplate rabbitTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        log.info("Received a new web socket connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) { //session 연결이 종료됨을 감지
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String socketType = (String) headerAccessor.getSessionAttributes().get("socketType");
        log.info("websocket session 종료를 감지");

        if(socketType == null) return;
        else if(socketType.equals("matching")){
            rabbitTemplate.convertAndSend(EXCAHGE_NAME, routingKey, event.getMessage().getHeaders().get("simpSessionId").toString());
        }
        //messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessage.getRoomId(), chatMessage);
    }
}
