package com.ssafy.learnway.service.auth;

import com.ssafy.learnway.domain.oauth.PrincipalDetails;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest); // google의 회원 프로필 조회
        Map<String, Object> attributes = oAuth2User.getAttributes(); // 소셜 로그인에서 API가 제공하는 userInfo의 Json 값(유저 정보들)

        String provider = "GOOGLE";
        String providerId = oAuth2User.getAttribute("sub");

        User user =
                userRepository.findByProviderAndProviderId(provider, providerId).orElse(null);

        if(user==null){
            log.info("회원가입해야함");
        } else {
            log.info("이미 가입 완료");
        }

        return new PrincipalDetails(user, oAuth2User.getAttributes());

    }

}

