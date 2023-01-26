package com.ssafy.learnway.controller;

import com.ssafy.learnway.dto.UserDto;
import com.ssafy.learnway.service.UserService;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(tags = {"user"})
@RestController
@RequestMapping("/users") // 추후에 user로 바꿔야함
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    // 회원 조회
    @GetMapping("/{userEmail}")
    public ResponseEntity findUserByEmail(@PathVariable String userEmail){
        if(userEmail==null) {
            return ResponseHandler.generateResponse("이메일을 입력해주세요.", HttpStatus.ACCEPTED);
        }
        try {
            UserDto userDto = userService.userInfo(userEmail); // 유저확인
            if(userDto!=null){
                return ResponseHandler.generateResponse("회원정보가 조회되었습니다.", HttpStatus.OK,"user",userDto);
            }else {
                return ResponseHandler.generateResponse("존재하지 않는 회원입니다.", HttpStatus.ACCEPTED);
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/test")
    public ResponseEntity test(){
        return ResponseHandler.generateResponse("test", HttpStatus.ACCEPTED);
    }

}
