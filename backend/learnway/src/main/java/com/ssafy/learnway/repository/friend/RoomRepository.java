package com.ssafy.learnway.repository.friend;


import com.ssafy.learnway.domain.friend.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    Room findByRelationId(int relationId);

    void deleteByRoomId(String roomId);
}
