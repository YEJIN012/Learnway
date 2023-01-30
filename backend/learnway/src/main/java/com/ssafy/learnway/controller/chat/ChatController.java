package com.ssafy.learnway.controller.chat;

import com.ssafy.learnway.dto.chat.ChatRoom;
import com.ssafy.learnway.service.chat.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

//    @PostMapping
//    public ChatRoom createRoom(@RequestParam String name){
//        return chatService.createRoom(name);
//    }

    @PostMapping
    public ChatRoom createRoom(){
        return chatService.createRoom();
    }

    @GetMapping
    public List<ChatRoom> findAllRoom(){
        return chatService.findAllRoom();
    }
}
