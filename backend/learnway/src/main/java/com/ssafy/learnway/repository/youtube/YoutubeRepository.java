package com.ssafy.learnway.repository.youtube;


import com.ssafy.learnway.dto.youtube.YoutubeRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;

@Repository
@RequiredArgsConstructor
@Slf4j
public class YoutubeRepository {
    private final RedisTemplate<String, Object> redisTemplate;

    // Redis 키
    private static final String YOUTUBE_ROOMS = "YOUTUBE_ROOM"; // 채팅룸 저장

    private HashOperations<String, String, YoutubeRoom> hashOpsChatRoom;

    @PostConstruct
    private void init() {
        hashOpsChatRoom = redisTemplate.opsForHash();
    }

    public YoutubeRoom findRoomById(String id) {
        return hashOpsChatRoom.get(YOUTUBE_ROOMS, id);
    }

    public YoutubeRoom createYoutubeRoom(String roomId) {
        YoutubeRoom youtubeRoom = YoutubeRoom.create(roomId);

        hashOpsChatRoom.put(YOUTUBE_ROOMS, youtubeRoom.getRoomId(), youtubeRoom);
        return youtubeRoom;
    }

    public void deleteYoutubeRoom(String roomId) {
        // 채팅방 정보 삭제
        hashOpsChatRoom.delete(YOUTUBE_ROOMS, roomId);
    }

}
