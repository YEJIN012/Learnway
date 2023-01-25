package com.ssafy.learnway.service;

import com.ssafy.learnway.domain.friend.Friend;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.repository.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class FriendService {
    @Autowired
    FriendRepository friendRepository;

    public List<Friend> list(Long userId){
        // 친구 관계를 한 번만 저장하기 때문에 두 번 탐색해야 함
        List<Friend> friendListByUID = friendRepository.findAllByUserId(userId);
        List<Friend> friendListByFID = friendRepository.findAllByFriendId(userId);
        List<Friend> friendList = Stream.concat(friendListByUID.stream(), friendListByFID.stream()).toList();
        return friendList;
    }

    public void make(Friend newRelation){
        friendRepository.save(newRelation);
    }

    public void delete(Friend relation){
        friendRepository.delete(relation);
    }

    public Friend findByEmail(Long userId, Long friendId){
        return friendRepository.findByUserIdAndFriendId(userId, friendId);
    }
}
