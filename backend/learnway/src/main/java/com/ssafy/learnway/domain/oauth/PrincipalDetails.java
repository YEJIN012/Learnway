package com.ssafy.learnway.domain.oauth;

import com.ssafy.learnway.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
@Getter
@AllArgsConstructor
public class PrincipalDetails implements OAuth2User {

    User user;
    private Map<String, Object> attributes;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getName() {
        return attributes.get("name").toString();
    }
}
