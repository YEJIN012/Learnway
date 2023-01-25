package com.ssafy.learnway.controller;

import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.service.UserService;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.sql.SQLException;
@Api(tags = {"user"})
@RestController
@RequestMapping("/user") // 추후에 user로 바꿔야함
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
            User user = userService.findByEmail(userEmail);
            if(user!=null){
                log.info(user.toString());
                return ResponseHandler.generateResponse("회원정보가 조회되었습니다.", HttpStatus.OK,"user",user);
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
