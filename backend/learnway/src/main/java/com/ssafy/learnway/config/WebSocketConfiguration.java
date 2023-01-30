package com.ssafy.learnway.config;

import com.ssafy.learnway.util.StompHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker //stomp 사용하도록 정의
@RequiredArgsConstructor
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer { //stomp 메시지 처리 방법
    private final StompHandler stompHandler;

    // pub/sub 구조 : publisher가 특정 topic에 메시지를 보내면 해당 topic을 구독해놓은 모든 subscriber에게 메시지가 전송이 된다.
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub"); //
        registry.setApplicationDestinationPrefixes("/pub"); // 메시지 발행 요청
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat") // ex ) ws://localhost:9000/chat
                .setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureClientInboundChannel (ChannelRegistration registration){
        registration.interceptors(stompHandler);
        //사용자가 웹 소켓 연결에 연결될 때와 끊길 때 관리(인증, 세션)
    }
}
