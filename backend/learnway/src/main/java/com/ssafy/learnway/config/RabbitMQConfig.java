package com.ssafy.learnway.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;

// 메세지를 발행할 publisher 서비스
public class RabbitMQConfig {

    private static final String EXCAHGE_NAME = "learnway.exchange";
    private static final String QUEUE_NAME = "learnway.queues";
    private static final String ROUTING_KEY = "learnway.routing.#";

    @Bean
    TopicExchange exchange() {
        return  new TopicExchange(EXCAHGE_NAME);
    }

    @Bean
    Queue queue() {
        return new Queue(QUEUE_NAME);
    }

    // exchange와 routing key의 패턴이 일치하는 queue에 메시지를 전달
    @Bean
    Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(ROUTING_KEY); //
    }

    @Bean
    RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, MessageConverter messageConverter) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        //  메세지에 담을 Object를 rabbitmq의 메시지 형식으로 변환
        rabbitTemplate.setMessageConverter(new Jackson2JsonMessageConverter());
        return rabbitTemplate;
    }

}
