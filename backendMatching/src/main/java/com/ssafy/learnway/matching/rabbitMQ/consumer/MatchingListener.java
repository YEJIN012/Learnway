package com.ssafy.learnway.matching.rabbitMQ.consumer;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class MatchingListener {

    @RabbitListener(queues = "learnway.queues")
    public void reciveMessage(final Message message) {
        log.info(message.toString());
    }
}
