package com.ssafy.learnway.controller.user;


import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.TokenDto;
import com.ssafy.learnway.dto.TokenRequestDto;
import com.ssafy.learnway.dto.UserDto;
import com.ssafy.learnway.dto.UserSignupDto;
import com.ssafy.learnway.service.UserService;
import com.ssafy.learnway.util.JwtTokenProvider;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@Api(tags = {"sign"})
@RestController
@RequestMapping("/users")
public class SignController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @GetMapping("/login")
    public ResponseEntity login(@RequestParam String userEmail, @RequestParam String userPwd ){

        try {
            TokenDto tokenDto = userService.login(userEmail,userPwd);
            UserDto userDto = userService.userInfo(userEmail); // 유저확인
            System.out.println(userDto.toString());

            return ResponseHandler.generateResponse("로그인에 성공하였습니다.", HttpStatus.OK, "token", tokenDto, "user",userDto);
        } catch (SQLException e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("이메일, 비밀번호를 다시 확인해주세요.", HttpStatus.ACCEPTED);
        }
    }
    @PostMapping("/sign-up")
    public ResponseEntity signup(@RequestBody UserDto userDto) {

        try {
            // 정보 미입력시 리턴
            if(userDto.getInterests()==null||userDto.getLanguage()==null||userDto.getName().equals("")||userDto.getUserEmail().equals("")||userDto.getUserPwd().equals("")){
                return ResponseHandler.generateResponse("회원가입 정보를 모두 입력해주세요.", HttpStatus.ACCEPTED);
            }

            // 관심 분야 3개 이상 체크
            if(userDto.getInterests().size()<3){
                return ResponseHandler.generateResponse("관심분야를 3개 이상 선택해주세요.", HttpStatus.ACCEPTED);
            }

            // 닉네임 한번 더 중복 체크
            User user = userService.dupName(userDto.getName());
            if(user!=null){
                return ResponseHandler.generateResponse("사용중인 닉네임입니다. 회원가입에 실패하였습니다.", HttpStatus.ACCEPTED);
            }

            userDto.setUserPwd(passwordEncoder.encode(userDto.getUserPwd()));
            
            // DB 초기화
            userDto.setBadUser(false);
            userDto.setBio("HI");
            userDto.setImgUrl(null);
            userService.signUp(userDto);
            return ResponseHandler.generateResponse("회원가입에 성공하였습니다.", HttpStatus.OK, "user", userDto.toEntity());
        } catch (Exception e) {
            return ResponseHandler.generateResponse("회원가입에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity refreshToken(@RequestBody TokenRequestDto tokenRequestDto){
        try {
            TokenDto newCreatedToken = userService.refreshToken(tokenRequestDto);
            return ResponseHandler.generateResponse("Refresh token 재발급에 성공하였습니다.",HttpStatus.OK,"token",newCreatedToken);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("Refresh token 재발급에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

    }
    //OAuth로 로그인 시 비밀번호 입력 창으로
    @GetMapping("/user/oauth/password/{userEmail}/{name}")
    public ResponseEntity oauth(@PathVariable("email") String userEmail, @PathVariable("nickname") String name) {
        UserDto userDto = UserDto.builder().userEmail(userEmail).name(name).build();

        return ResponseHandler.generateResponse("Google 로그인 성공하였습니다. 나머지 정보도 입력해주세요.",HttpStatus.OK);

    }

        @GetMapping("/oauth2/sign-up")
    public @ResponseBody String testOAuthLogin(Authentication authentication , @AuthenticationPrincipal OAuth2User oauth){// DI(의존성주입)
        // @AuthenticationPrincipal이라는 어노테이션을 통해서 세션정보를 받을 수 있다.
        System.out.println("=====IndexController.testLogin====");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        System.out.println("oAuth2User.getAttributes() = " + oAuth2User.getAttributes());
        // oAuth2User.getAttributes() = {sub=103489475512635244738, name=‍고경환[재학 / 정보통신공학과], given_name=고경환[재학 / 정보통신공학과], family_name=‍, profile=https://plus.google.com/103489475512635244738, picture=https://lh3.googleusercontent.com/a/AItbvmlIUxyycyZvUHNNhzX20-5mvGrmrDbw6G1_Ylqn=s96-c, email={이메일}, email_verified=true, locale=ko, hd=hufs.ac.kr}
        System.out.println("oauth.getAttributes() = " + oauth.getAttributes());
        // oauth.getAttributes() = {sub=103489475512635244738, name=‍고경환[재학 / 정보통신공학과], given_name=고경환[재학 / 정보통신공학과], family_name=‍, profile=https://plus.google.com/103489475512635244738, picture=https://lh3.googleusercontent.com/a/AItbvmlIUxyycyZvUHNNhzX20-5mvGrmrDbw6G1_Ylqn=s96-c, email={이메일}, email_verified=true, locale=ko, hd=hufs.ac.kr}
        return "세션 정보 확인하기";
    }

}
