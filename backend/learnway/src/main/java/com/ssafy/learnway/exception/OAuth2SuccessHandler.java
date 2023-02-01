package com.ssafy.learnway.exception;

import com.ssafy.learnway.domain.oauth.CustomOAuth2User;
import com.ssafy.learnway.dto.TokenDto;
import com.ssafy.learnway.repository.RefreshTokenRepository;
import com.ssafy.learnway.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private  final JwtTokenProvider jwtTokenProvider;

    private RefreshTokenRepository refreshTokenRepository;

    private PasswordEncoder passwordEncoder;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        log.info("OAuth2 Login 성공!");

        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            // User의 Role이 GUEST일 경우 처음 요청한 회원이므로 회원가입 페이지로 리다이렉트
            if(oAuth2User.getRole().equals("ROLE_GUEST")) {
                TokenDto tokenDto = jwtTokenProvider.createTokenDto(oAuth2User.getUserId(), Collections.singletonList("ROLE_USER"));
                Collections.singletonList("ROLE_GUEST");


                //String accessToken = jwtTokenProvider.createTokenDto(oAuth2User.getEmail());
                //response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
                response.sendRedirect("/users/oauth2/sign-up"); // 프론트의 회원가입 추가 정보 입력 폼으로 리다이렉트

                //jwtService.sendAccessAndRefreshToken(response, accessToken, null);
//                User findUser = userRepository.findByEmail(oAuth2User.getEmail())
//                                .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));
//                findUser.authorizeUser();
            } else {
                //loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성
            }
        } catch (Exception e) {
            throw e;
        }



//        try {
//            OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
//
//            // User의 Role이 GUEST일 경우 처음 요청한 회원이므로 회원가입 페이지로 리다이렉트
//            if(oAuth2User.get) {
//                String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
//                response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
//                response.sendRedirect("oauth2/sign-up"); // 프론트의 회원가입 추가 정보 입력 폼으로 리다이렉트
//
//                jwtService.sendAccessAndRefreshToken(response, accessToken, null);
////                User findUser = userRepository.findByEmail(oAuth2User.getEmail())
////                                .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));
////                findUser.authorizeUser();
//            } else {
//                loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성
//            }
//        } catch (Exception e) {
//            throw e;
//        }

    }


//
//
//
//        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
//        System.out.println("oAuth2User = " + oAuth2User);
//
//        TokenDto tokenDto = jwtTokenProvider.createTokenDto(oAuth2User ,oAuth2User.getAttrib);
//
//
//        String userEmail = (String) oAuth2User.getAttributes().get("email");
//        String name = (String) oAuth2User.getAttributes().get("name");
//        String password = passwordEncoder.encode((String) oAuth2User.getAttributes().get("email"));
//
//        UserDto userDto = UserDto.builder().userEmail((userEmail))
//                        .name(name).userPwd(password)
//                        .build();


//
//
//        //한글 닉네임인 경우 인코딩
//        name = URLEncoder.encode(name);
//        System.out.println("nickname = " + name);
//
//        //패스워드 입력하도록 리다이렉트
//        response.sendRedirect("/user/oauth/password/"+userEmail+"/"+name);


//        OAuth2User oAuth2User =  (OAuth2User) authentication.getPrincipal();

//        String targetUrl;
//
//        TokenDto tokenDto = jwtTokenProvider.createTokenDto(oAuth2User.getUserId(),oAuth2User.getRoles());
//
//        RefreshToken refreshToken = RefreshToken.builder()
//                .userKey(oAuth2User.getUserId())
//                .token(tokenDto.getRefreshToken())
//                .build();
//
//        refreshTokenRepository.save(refreshToken);
//
//        targetUrl = UriComponentsBuilder.fromUriString("/auth/oauth2/success")
//                .queryParam("accessToken",tokenDto.getAccessToken())
//                .queryParam("refreshToken",tokenDto.getRefreshToken())
//                .build().toUriString();
//        getRedirectStrategy().sendRedirect(request, response, targetUrl);
//
//
//
//        public UserDto toDto(OAuth2User oAuth2User) {
//            var attributes = oAuth2User.getAttributes();
//            return UserDto.builder()
//                    .email((String)attributes.get("email"))
//                    .name((String)attributes.get("name"))
//                    .picture((String)attributes.get("picture"))
//                    .build();
//        }
//    }

}
