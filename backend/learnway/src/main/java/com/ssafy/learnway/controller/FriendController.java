package com.ssafy.learnway.controller;

import com.ssafy.learnway.domain.friend.Friend;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.service.FriendService;
import com.ssafy.learnway.service.UserService;
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
    public ResponseEntity list(@RequestBody String userEmail) throws SQLException {
        try {
            Long userId = userService.findByEmail(userEmail).getUserId();
            List<Friend> friendList = friendService.list(userId);
            List<String> userEmailList = new ArrayList<>();

            // 행 하나의 두 아이디가 검색하려는 유저의 아이디와 다르면 (자신이 아닌 친구라면)
            // 리스트에 저장
            for (Friend friend : friendList) {
                User tmpUser = friend.getUserId();
                User tmpFriend = friend.getFriendId();
                if (tmpUser.getUserId() == userId) userEmailList.add(tmpUser.getUserEmail());
                else userEmailList.add(tmpFriend.getUserEmail());
            }
            return new ResponseEntity<>(userEmailList, HttpStatus.OK);
        } catch (DataException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping
    public ResponseEntity make(@RequestBody String user_email, @RequestBody String friend_email) throws SQLException {
        try {
            // 유저, 친구 객체 반환
            User user = userService.findByEmail(user_email);
            User friend = userService.findByEmail(friend_email);
            Friend newRelation = Friend.builder().userId(user).friendId(friend).build();
            friendService.make(newRelation);
        } catch (DataException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping
    public void delete(@RequestBody String user_email, String friend_email) throws SQLException {
        try {
            Long userId = userService.findByEmail(user_email).getUserId();
            Long friendId = userService.findByEmail(friend_email).getUserId();
            Friend relation = friendService.findByEmail(userId, friendId);
            friendService.delete(relation);
        } catch (DataException e) {
            e.printStackTrace();
        }
    }
}

