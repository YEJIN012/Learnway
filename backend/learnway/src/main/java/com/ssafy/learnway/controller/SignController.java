package com.ssafy.learnway.controller;

import com.ssafy.learnway.domain.RefreshToken;
import com.ssafy.learnway.domain.User;
import com.ssafy.learnway.dto.TokenDto;
import com.ssafy.learnway.dto.TokenRequestDto;
import com.ssafy.learnway.dto.UserSignupRequestDto;
import com.ssafy.learnway.service.UserService;
import com.ssafy.learnway.util.JwtTokenProvider;
import com.ssafy.learnway.util.ResponseHandler;
import com.sun.xml.bind.v2.runtime.unmarshaller.XsiNilLoader;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@Api(tags = {"sign"})
@RestController
@RequestMapping("/user")
public class SignController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestParam String userEmail, @RequestParam String userPwd ){

        try {
            TokenDto tokenDto = userService.login(userEmail,userPwd);
            User user = userService.userInfo(userEmail); // 유저확인
            return ResponseHandler.generateResponse("로그인에 성공하였습니다.", HttpStatus.OK, "accessToken", tokenDto, "user",user);
        } catch (SQLException e) {
            return ResponseHandler.generateResponse("이메일, 비밀번호를 다시 확인해주세요.", HttpStatus.ACCEPTED);
        }
    }
    @GetMapping("/sign-up")
    public ResponseEntity signup(@RequestParam String userEmail, @RequestParam String userPwd) {

        // 회원가입 요청 dto 생성
        UserSignupRequestDto userSignupRequestDto = UserSignupRequestDto.builder()
                .userEmail(userEmail)
                .userPwd(passwordEncoder.encode(userPwd))
                .build();
        try {
            userService.signUp(userSignupRequestDto);
            return ResponseHandler.generateResponse("회원가입에 성공하였습니다.", HttpStatus.OK, "user", userSignupRequestDto.toEntity());
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

}
