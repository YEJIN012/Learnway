package com.ssafy.learnway.service.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// UserDetailsService : 아이디에 해당하는 정보를 db에서 확인할 때 사용하는 인터페이스
// CustomUserDetailsService : UserDetailsService 인터페이스를 구현한 baen
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
