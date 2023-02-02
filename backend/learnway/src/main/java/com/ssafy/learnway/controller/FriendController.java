package com.ssafy.learnway.controller;

import com.ssafy.learnway.domain.friend.Friend;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.FriendRequestDto;
import com.ssafy.learnway.service.FriendService;
import com.ssafy.learnway.service.UserService;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.DataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Api(tags = {"friend"})
@RestController
@RequestMapping("/friend")
@RequiredArgsConstructor
public class FriendController {
    @Autowired
    FriendService friendService;
    @Autowired
    UserService userService;

    @GetMapping("/list")
    public ResponseEntity list(@RequestParam String userEmail) throws SQLException {
        try {
            User user = userService.findByEmail(userEmail);
            Long userId = user.getUserId();
            List<Friend> friendList = friendService.list(user);
            List<String> userEmailList = new ArrayList<>();


            // 행 하나의 두 아이디가 검색하려는 유저의 아이디와 다르면 (자신이 아닌 친구라면)
            // 리스트에 저장
            for (Friend friend : friendList) {
                User tmpUser = friend.getUserId();
                User tmpFriend = friend.getFriendId();
                if (tmpUser.getUserId() == userId) userEmailList.add(tmpFriend.getUserEmail());
                else userEmailList.add(tmpUser.getUserEmail());
            }

            if(userEmailList.isEmpty()) return ResponseHandler.generateResponse("검색된 친구가 없습니다.", HttpStatus.NOT_FOUND);

            return ResponseHandler.generateResponse("검색된 친구 목록입니다.", HttpStatus.OK, "userEmailList", userEmailList);
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
            System.out.println(relation.toString());
            friendService.delete(relation);
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

}

