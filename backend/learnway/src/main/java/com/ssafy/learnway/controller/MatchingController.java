package com.ssafy.learnway.controller;

import com.ssafy.learnway.config.RabbitMQConfig;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.annotations.Api;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"matching"})
@RestController
@RequestMapping("/matching")
public class MatchingController {

    // rabbitMQ의 EXCAHGE NAME
    private static final String EXCAHGE_NAME = "learnway.exchange";

    @Autowired
    RabbitTemplate rabbitTemplate;

    @GetMapping("/{userEmail}")
    public ResponseEntity matching(@PathVariable String userEmail) {
        rabbitTemplate.convertAndSend(EXCAHGE_NAME, "sample.routing.#", "RabbitMQ + SpringBoot = Success");
        //return "Message seding!";
        return ResponseHandler.generateResponse("성공", HttpStatus.ACCEPTED);
    }

    @GetMapping("/test/{userEmail}")
    public ResponseEntity matchingTest(@PathVariable String userEmail) {
        MessageConverter converter = rabbitTemplate.getMessageConverter();
        MessageProperties props = new MessageProperties();
        Message message = converter.toMessage(userEmail, props);
        rabbitTemplate.send("tacocloud.order", message);
        return ResponseHandler.generateResponse("성공", HttpStatus.ACCEPTED);
    }






}
