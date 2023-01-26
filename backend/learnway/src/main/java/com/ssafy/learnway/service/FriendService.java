package com.ssafy.learnway.service;

import com.ssafy.learnway.domain.friend.Friend;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.repository.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
public class FriendService {
    @Autowired
    FriendRepository friendRepository;

    public List<Friend> list(User user) {
        // 친구 관계를 한 번만 저장하기 때문에 두 번 탐색해야 함
        List<Friend> friendListByUID = friendRepository.findAllByUserId(user);
        List<Friend> friendListByFID = friendRepository.findAllByFriendId(user);
        List<Friend> friendList = new ArrayList<>();

        if (friendListByUID.isEmpty() && friendListByFID.isEmpty()) {
            System.out.println("1111111111111111");
            return Stream.concat(friendListByUID.stream(), friendListByFID.stream()).toList();
        } else if (friendListByUID.isEmpty() && !friendListByFID.isEmpty()) {
            System.out.println("2222222222222222");
            return friendListByFID;

        } else if (!friendListByUID.isEmpty() && friendListByFID.isEmpty()) {
            System.out.println("33333333333333333");
            return friendListByUID;
        }
        return friendList;
    }

    public void make(Friend newRelation) {
        friendRepository.save(newRelation);
    }

    public void delete(Friend relation) {
        friendRepository.delete(relation);
    }

    public Friend findById(User userId, User friendId) {

        return friendRepository.findByUserIdAndFriendId(userId, friendId);
    }
}
