package com.ssafy.learnway.service.friend;

import com.ssafy.learnway.domain.friend.Friend;
import com.ssafy.learnway.domain.friend.Room;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.ProfileDto;
import com.ssafy.learnway.dto.friend.RoomDto;
import com.ssafy.learnway.repository.friend.RoomRepository;
import com.ssafy.learnway.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    private final UserService userService;

    @Transactional
    public Room createRoom(Friend friend, String roomId){
        Room room = Room.builder().friend(friend).roomId(roomId).build();
        return roomRepository.save(room);
    }

    public Room findByRelationId(Friend relationId) {
        return roomRepository.findByRelationId(relationId.getRelationId());
    }

    public List<RoomDto> findRooms(List<Friend> friends) throws SQLException {
        List<RoomDto> rooms = new ArrayList<>();
        for(Friend friend : friends){
            Room room = roomRepository.findByRelationId(friend.getRelationId());

            ///////// 리팩토링 필요
            User opponent = userService.findById(friend.getUserId().getUserId());
            ProfileDto profileDto = userService.getProfile(opponent.getUserEmail());
            //////////

            if(room!=null){
                rooms.add(RoomDto.builder()
                        .relationId(room.getRelationId())
                        .roomId(room.getRoomId())
                        .profileDto(profileDto)
                        .build()
                );
            }
        }

        // 시간대 별로 정렬
        Collections.sort(rooms);

        return rooms;
    }

    @Transactional
    public void deleteByRoomId(String roomId){
        roomRepository.deleteByRoomId(roomId);
    }
}
