package com.ssafy.learnway.repository;

import com.ssafy.learnway.domain.friend.Friend;
import com.ssafy.learnway.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface FriendRepository extends JpaRepository<Friend, Integer> {
    List<Friend> findAllByUserId(Long userId);
    List<Friend> findAllByFriendId(Long friendId);
    Friend findByUserIdAndFriendId(Long userId, Long friendId);

}
