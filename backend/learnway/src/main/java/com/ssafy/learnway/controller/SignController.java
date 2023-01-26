package com.ssafy.learnway.controller;


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
import org.springframework.security.crypto.password.PasswordEncoder;
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
            userDto.setUserPwd(passwordEncoder.encode(userDto.getUserPwd()));
            userDto.setBadUser(false);
            userDto.setBio("HI");
            userDto.setImgUrl(null);
            userService.signUp(userDto);
            return ResponseHandler.generateResponse("회원가입에 성공하였습니다.", HttpStatus.OK, "user", userDto.toEntity());
        } catch (Exception e) {
            e.printStackTrace();
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
