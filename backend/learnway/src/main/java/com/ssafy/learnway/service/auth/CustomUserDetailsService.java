package com.ssafy.learnway.service.auth;

import com.ssafy.learnway.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// UserDetailsService : 아이디에 해당하는 정보를 db에서 확인할 때 사용하는 인터페이스
// CustomUserDetailsService : UserDetailsService 인터페이스를 구현하고 있는 객체가 bean으로 등록되어있어야함
@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String userPk) throws UsernameNotFoundException {
        return userRepository.findById(Long.parseLong(userPk)).orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
    }
}
