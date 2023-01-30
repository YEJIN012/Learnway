package com.ssafy.learnway.service.auth;

import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.OAuthAttributesDto;
import com.ssafy.learnway.dto.UserDto;
import com.ssafy.learnway.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
//public class CustomOAuth2UserService extends DefaultOAuth2UserService {
//
//    @Autowired
//    private final UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private final UserService userService;
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{
//        OAuth2User oAuth2User = super.loadUser(userRequest);
//
//        // 현재 로그인 진행 중인 서비스를 구분. ex)구글, 네이버 등
//        String provider = userRequest.getClientRegistration().getRegistrationId();    //google
//        // OAuth2 로그인 진행 시 키가 되는 필드값. Primary Key와 같은 의미. 구글의 기본 코드는 "sub"
//        String providerId = oAuth2User.getAttributes().get("sub").toString();
//
//        String name = oAuth2User.getAttributes().get("name").toString();
//        String userEmail = oAuth2User.getAttributes().get("email").toString();
//        String userPwd = passwordEncoder.encode(userEmail);
//        String role = "ROLE_USER";
//
//        User user = userRepository.findByUserEmail(userEmail);
//
//        if(user==null){
//            log.info("구글 로그인이 최초입니다. 회원가입을 진행합니다.");
//            user = User.builder().userEmail(userEmail).name(name).userPwd(userPwd).roles( Collections.singletonList("ROLE_USER")).build();
//            return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")), attributes.getAttributes(), attributes.getNameAttributeKey());
//        }
//        return new DefaultOAuth2User(user, oAuth2User.getAttributes());
//    }
//
//}

public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    private final HttpSession httpSession;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();

        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();   //google
        // OAuth2 로그인 진행 시 키가 되는 필드값. Primary Key와 같은 의미. 구글의 기본 코드는 "sub"
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributesDto oAuthAttributesDto = OAuthAttributesDto.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        log.info("{}",oAuthAttributesDto);

//        User user = saveOrUpdate(attributes);
//        httpSession.setAttribute("user", new UserDto(user)); // 세션 저장
//
//        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")), attributes.getAttributes(), attributes.getNameAttributeKey());

        User user = userRepository.findByUserEmail(oAuth2User.getAttributes().get("email").toString());

        if (user!=null){
            user.update(attributes.getEmail(), passwordEncoder.encode(attributes.getEmail()), attributes.getName());
            return user;
        }else{
            return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")), oAuthAttributesDto.getAttributes(), oAuthAttributesDto.getAttributeKey());

        }

        var memberAttribute = oAuthAttributesDto.convertToMap();

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                memberAttribute, "email");
    }

//    private User saveOrUpdate(OAuthAttributesDto attributes){
//        User user = userRepository.findByUserEmail(attributes.getEmail());
//        if (user!=null){
//            user.update(attributes.getEmail(), passwordEncoder.encode(attributes.getEmail()), attributes.getName());
//            return user;
//        }else{
//            user = attributes.toEntity();
//            return userRepository.save(user);
//        }
//
//    }
}

