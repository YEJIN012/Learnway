package com.ssafy.learnway.dto.youtube;

import lombok.Data;

import java.io.Serializable;

@Data
public class YoutubeRoom implements Serializable {
    private String roomId;

    public static YoutubeRoom create(String roomId){
        YoutubeRoom youtubeRoom = new YoutubeRoom();
        youtubeRoom.roomId = roomId;
        return youtubeRoom;
    }

}
