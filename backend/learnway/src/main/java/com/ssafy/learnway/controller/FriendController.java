package com.ssafy.learnway.controller;

import com.ssafy.learnway.domain.friend.Friend;
import com.ssafy.learnway.domain.friend.Room;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.friend.VideoChatResult;
import com.ssafy.learnway.dto.matching.Result;
import com.ssafy.learnway.dto.user.ProfileDto;
import com.ssafy.learnway.dto.friend.FriendRequestDto;
import com.ssafy.learnway.repository.chat.ChatRoomRepository;
import com.ssafy.learnway.service.friend.RoomService;
import com.ssafy.learnway.service.user.UserService;
import com.ssafy.learnway.service.friend.FriendService;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Tag(name = "friend")
@Slf4j
@RestController
@RequestMapping("/friend")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;
    private final UserService userService;
    private final RoomService roomService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/list")
    public ResponseEntity list(@RequestParam String userEmail) throws SQLException {
        try {
            User user = userService.findByEmail(userEmail);
            Long userId = user.getUserId();
            List<Friend> friendList = friendService.list(user);
//            List<String> userEmailList = new ArrayList<>();
            List<ProfileDto> friendProfileList = new ArrayList<>();

            // 행 하나의 두 아이디가 검색하려는 유저의 아이디와 다르면 (자신이 아닌 친구라면)
            // 리스트에 저장
            for (Friend friend : friendList) {
                User tmpUser = friend.getUserId();
                User tmpFriend = friend.getFriendId();
                if (tmpUser.getUserId() == userId) friendProfileList.add(userService.getProfile(tmpFriend.getUserEmail()));
                else friendProfileList.add(userService.getProfile(tmpUser.getUserEmail()));
            }

            if(friendProfileList.isEmpty()) return ResponseHandler.generateResponse("검색된 친구가 없습니다.", HttpStatus.NOT_FOUND);

            return ResponseHandler.generateResponse("검색된 친구 목록입니다.", HttpStatus.OK, "friendProfileList", friendProfileList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("서버 오류입니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping
    public ResponseEntity make(@RequestBody FriendRequestDto dto) throws SQLException {
        try {
            // 유저, 친구 객체 반환
            User user = userService.findByEmail(dto.getUserEmail());
            User friend = userService.findByEmail(dto.getFriendEmail());

            if (user==null || friend == null) return ResponseHandler.generateResponse("유효하지 않은 이메일입니다.", HttpStatus.NOT_FOUND);

            /// 중복으로 친구 추가 방지
            if(friendService.findById(user,friend)!=null){
                return ResponseHandler.generateResponse("이미 추가가 된 친구입니다.", HttpStatus.NOT_FOUND);
            }

            Friend newRelation = Friend.builder().userId(user).friendId(friend).build();
            friendService.make(newRelation);

            return ResponseHandler.generateResponse("친구 생성에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("친구 생성에 실패하였습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping
    public ResponseEntity delete(@RequestBody FriendRequestDto dto){
        try {
            User user = userService.findByEmail(dto.getUserEmail());
            User friend = userService.findByEmail(dto.getFriendEmail());

            if (user==null || friend == null) return ResponseHandler.generateResponse("유효하지 않은 이메일입니다.", HttpStatus.NOT_FOUND);

            Friend relation = friendService.findById(user, friend);

            // 채팅방 삭제
            Room room = roomService.findByRelationId(relation);

            if(room != null) {
                roomService.deleteByRoomId(room.getRoomId());

            }

            friendService.deleteById(relation);

            return ResponseHandler.generateResponse("친구가 삭제되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("친구 삭제에 실패하였습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/count")
    public ResponseEntity count(@RequestParam String userEmail){
        try{
            User user = userService.findByEmail(userEmail);

            int friendCnt = friendService.countByUserId(user);
            return ResponseHandler.generateResponse("모든 친구 수입니다.", HttpStatus.OK, "friendCnt", friendCnt);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseHandler.generateResponse("친구 수 조회에 실패했습니다..", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/makeVideochat/{userEmail}/{friendEmail}")
    public ResponseEntity makeVideochat(@PathVariable String userEmail, @PathVariable String friendEmail){
        try{
            User user = userService.findByEmail(userEmail);
            User opponent = userService.findByEmail(friendEmail);
            Friend friend = friendService.findById(user,opponent);

            if(friend == null){
                return ResponseHandler.generateResponse("현재 친구 관계가 아닙니다. 생성하실 수 없습니다.", HttpStatus.ACCEPTED);
            }

            // 상대방 정보만 보내줌. 상대방이 방에 들어올 때, 화상채팅을 요구한 사람의 정보가 필요함.
            ProfileDto friendProfile = userService.getProfile(opponent.getUserEmail());
            ProfileDto userProfile = userService.getProfile(user.getUserEmail());

            String roomId = passwordEncoder.encode(user.getUserEmail()+opponent.getUserEmail());

            VideoChatResult videoChatResult = VideoChatResult.builder().userProfileDto(userProfile).friendProfileDto(friendProfile).roomId(roomId).build();

            return ResponseHandler.generateResponse("화상채팅이 생성되었습니다.", HttpStatus.ACCEPTED,"videoChatInfo", videoChatResult);

        } catch(Exception e){
            e.printStackTrace();
            return ResponseHandler.generateResponse("화상채팅 생성에 실패하였습니다..", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

