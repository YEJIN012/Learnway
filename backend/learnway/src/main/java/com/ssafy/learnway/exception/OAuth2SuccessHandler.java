package com.ssafy.learnway.exception;

import com.ssafy.learnway.domain.RefreshToken;
import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.TokenDto;
import com.ssafy.learnway.dto.UserDto;
import com.ssafy.learnway.repository.RefreshTokenRepository;
import com.ssafy.learnway.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;

@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private  final JwtTokenProvider jwtTokenProvider;

    private RefreshTokenRepository refreshTokenRepository;

    private PasswordEncoder passwordEncoder;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
        System.out.println("oAuth2User = " + oAuth2User);

        TokenDto tokenDto = jwtTokenProvider.createTokenDto(oAuth2User ,oAuth2User.getAttrib);


        String userEmail = (String) oAuth2User.getAttributes().get("email");
        String name = (String) oAuth2User.getAttributes().get("name");
        String password = passwordEncoder.encode((String) oAuth2User.getAttributes().get("email"));

        UserDto userDto = UserDto.builder().userEmail((userEmail))
                        .name(name).userPwd(password)
                        .build();


//
//
//        //한글 닉네임인 경우 인코딩
//        name = URLEncoder.encode(name);
//        System.out.println("nickname = " + name);
//
//        //패스워드 입력하도록 리다이렉트
//        response.sendRedirect("/user/oauth/password/"+userEmail+"/"+name);


//        OAuth2User oAuth2User =  (OAuth2User) authentication.getPrincipal();

        String targetUrl;

        TokenDto tokenDto = jwtTokenProvider.createTokenDto(oAuth2User.getUserId(),oAuth2User.getRoles());

        RefreshToken refreshToken = RefreshToken.builder()
                .userKey(oAuth2User.getUserId())
                .token(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        targetUrl = UriComponentsBuilder.fromUriString("/auth/oauth2/success")
                .queryParam("accessToken",tokenDto.getAccessToken())
                .queryParam("refreshToken",tokenDto.getRefreshToken())
                .build().toUriString();
        getRedirectStrategy().sendRedirect(request, response, targetUrl);



        public UserDto toDto(OAuth2User oAuth2User) {
            var attributes = oAuth2User.getAttributes();
            return UserDto.builder()
                    .email((String)attributes.get("email"))
                    .name((String)attributes.get("name"))
                    .picture((String)attributes.get("picture"))
                    .build();
        }
    }

}
