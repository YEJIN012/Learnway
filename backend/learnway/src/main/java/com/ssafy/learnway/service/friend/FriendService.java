package com.ssafy.learnway.service.friend;

import com.ssafy.learnway.domain.friend.Friend;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.repository.friend.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
public class FriendService {
    @Autowired
    FriendRepository friendRepository;

    @Transactional(readOnly = true)
    public List<Friend> list(User user) {
        // 친구 관계를 한 번만 저장하기 때문에 두 번 탐색해야 함
        List<Friend> friendListByUID = friendRepository.findAllByUserId(user);
        List<Friend> friendListByFID = friendRepository.findAllByFriendId(user);
        List<Friend> friendList = new ArrayList<>();

        if (!friendListByUID.isEmpty() && !friendListByFID.isEmpty()) { //둘 경우 다  검색됨
            return Stream.concat(friendListByUID.stream(), friendListByFID.stream()).toList();
        } else if (friendListByUID.isEmpty() && !friendListByFID.isEmpty()) {
            return friendListByFID;

        } else if (!friendListByUID.isEmpty() && friendListByFID.isEmpty()) {
            return friendListByUID;
        }
        return friendList;
    }

    @Transactional
    public void make(Friend newRelation) {
        friendRepository.save(newRelation);
    }

    @Transactional
    public void delete(Friend relation) {
        friendRepository.delete(relation);
    }

    @Transactional(readOnly = true)
    public Friend findById(User userId, User friendId) {
        // 한 번만 저장되었기 때문에 두번 탐색을 진행해야 한다.
        Friend friend = friendRepository.findByUserIdAndFriendId(userId, friendId);
        if(friend == null){
            return friendRepository.findByUserIdAndFriendId(friendId, userId);
        }else{
            return friend;
        }
    }
}
