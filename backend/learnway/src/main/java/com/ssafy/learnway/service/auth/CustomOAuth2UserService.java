package com.ssafy.learnway.service.auth;

import com.ssafy.learnway.domain.oauth.CustomOAuth2User;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.OAuthAttributesDto;
import com.ssafy.learnway.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;


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
@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("CustomOAuth2UserService.loadUser() 실행 - OAuth2 로그인 요청 진입");
        log.info("getAccessToken : "+userRequest.getAccessToken());

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate  = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest); // OAuth2User는 OAuth 서비스에서 가져온 유저 정보를 담고 있는 유저

        log.info( userRequest.getClientRegistration().getRegistrationId()); //google
        log.info(userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName()); // sub
        log.info(oAuth2User.getAttribute("sub")); // "sub"에 맞는 값

        String socialType = userRequest.getClientRegistration().getRegistrationId();   //google
        String socialId = oAuth2User.getAttribute("sub"); // "sub"에 맞는 값

        // String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName(); // OAuth2 로그인 시 키(PK)가 되는 값

        Map<String, Object> attributes = oAuth2User.getAttributes(); // 소셜 로그인에서 API가 제공하는 userInfo의 Json 값(유저 정보들)

        OAuthAttributesDto oAuthAttributesDto = OAuthAttributesDto.of(socialType,attributes);

        User createdUser = getUser(oAuthAttributesDto, socialType);

        return new CustomOAuth2User(Collections.singleton(new SimpleGrantedAuthority(createdUser.getRoles().toString())),attributes,"sub",createdUser.getUserEmail(),createdUser.getRoles().toString(),createdUser.getUserId());
    }


    /**
     * SocialType과 attributes에 들어있는 소셜 로그인의 식별값 id를 통해 회원을 찾아 반환하는 메소드
     * 만약 찾은 회원이 있다면, 그대로 반환하고 없다면 saveUser()를 호출하여 회원을 저장한다.
     */
    private User getUser(OAuthAttributesDto oAuthAttributesDto, String socialType) {
        User findUser = userRepository.findBySocialTypeAndSocialId(socialType,
                (String) oAuthAttributesDto.getAttributes().get("sub")).orElse(null);

        if(findUser == null) {
            return saveUser(oAuthAttributesDto, socialType);
        }
        return findUser;
    }

    /**
     * OAuthAttributesDto의 toEntity() 메소드를 통해 빌더로 User 객체 생성 후 반환
     * 생성된 User 객체를 DB에 저장 : socialType, socialId, email, role 값만 있는 상태
     */
    private User saveUser(OAuthAttributesDto oAuthAttributesDto, String socialType) {
        return userRepository.save(oAuthAttributesDto.toEntity());
    }


//        OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();
//
//        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);
//
//        String registrationId = userRequest.getClientRegistration().getRegistrationId();   //google
//        // OAuth2 로그인 진행 시 키가 되는 필드값. Primary Key와 같은 의미. 구글의 기본 코드는 "sub"
//        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
//
//        OAuthAttributesDto oAuthAttributesDto = OAuthAttributesDto.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());
//
//        log.info("{}",oAuthAttributesDto);
//
////        User user = saveOrUpdate(attributes);
////        httpSession.setAttribute("user", new UserDto(user)); // 세션 저장
////
////        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")), attributes.getAttributes(), attributes.getNameAttributeKey());
//
//        User user = userRepository.findByUserEmail(oAuth2User.getAttributes().get("email").toString());
//
//        if (user!=null){
//            user.update(attributes.getEmail(), passwordEncoder.encode(attributes.getEmail()), attributes.getName());
//            return user;
//        }else{
//            return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")), oAuthAttributesDto.getAttributes(), oAuthAttributesDto.getAttributeKey());
//
//        }
//
//        var memberAttribute = oAuthAttributesDto.convertToMap();
//
//        return new DefaultOAuth2User(
//                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
//                memberAttribute, "email");
//    }

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

