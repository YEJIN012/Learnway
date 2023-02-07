package com.ssafy.learnway.config;

import com.ssafy.learnway.dto.matching.MatchingRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.RabbitListenerContainerFactory;
import org.springframework.amqp.support.converter.MessageConversionException;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.ObjectInputStream;

/**
 * 기본으로 사용하는 SimpleMessageConverter는 메시지를 보낼 때 object를 바이트배열로 직렬화함
 * 이 직렬화된 데이터를 다시 원래대로 되돌리기위해 역직렬화 필요
 * 역직렬화를 할 수 있도록 Config 설정
 * **/

@RequiredArgsConstructor
@Configuration
public class RabbitMQConfig {

    @Bean
    public RabbitListenerContainerFactory<?> rabbitListenerContainerFactory(ConnectionFactory connectionFactory) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(new MessageConverter() {
            @Override
            public Message toMessage(Object object, MessageProperties messageProperties) throws MessageConversionException {
                return null;
            }

            @Override
            public Object fromMessage(Message message) throws MessageConversionException {
                try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(message.getBody()))) {
                    return (MatchingRequestDto)ois.readObject();
                } catch (Exception e) {
                    e.printStackTrace();
                    return null;
                }
            }
        });

        return factory;
    }

}
