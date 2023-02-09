package com.ssafy.learnway.controller.user;

import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.service.user.MailService;
import com.ssafy.learnway.service.user.UserService;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "users")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/users")
public class MailController {

    private final MailService mailService;

    private final UserService userService;

    @GetMapping("/verify")
    public ResponseEntity mailConfirm(@RequestParam(value = "user_email") String userEmail, @RequestParam(value = "find_code") int findCode) throws Exception {

        User user = userService.findByEmail(userEmail);

        if(findCode == 0){ //비밀번호 찾기
            if(user != null){
                String code = mailService.sendSimpleMessage(userEmail);
                //log.info("인증코드 : " + code);
                return ResponseHandler.generateResponse("인증번호가 발급되었습니다.", HttpStatus.OK);
            }else {
                return ResponseHandler.generateResponse("현재 회원이 아닙니다.", HttpStatus.ACCEPTED); //202를 보낸다.
            }
        }else if(findCode == 1){ //중복이메일 검사
            if(user != null){
                return ResponseHandler.generateResponse("이미 회원가입이 된 유저입니다.", HttpStatus.ACCEPTED); //202를 보낸다.
            }else {
                String code = mailService.sendSimpleMessage(userEmail);
                //log.info("인증코드 : " + code);
                return ResponseHandler.generateResponse("인증번호가 발급되었습니다.", HttpStatus.OK);
            }
        }else{ //잘못보낸 요청
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/verify")
    @ResponseBody
    public ResponseEntity verifyConfirm(@RequestParam(name = "user_email") String userEmail, @RequestParam(name = "code") String value) throws Exception {

        User user = userService.findByEmail(userEmail);
        if(user != null){
            return ResponseHandler.generateResponse("이미 회원가입이 된 유저입니다.", HttpStatus.CONFLICT); //409에러를 보낸다.
        }
        try {
            boolean isEmail = mailService.verifyEmail(userEmail, value);
//            log.info("인증여부 : " + isEmail);
            if(isEmail){
                return ResponseHandler.generateResponse("인증번호가 일치합니다.", HttpStatus.OK);
            }else{
                return ResponseHandler.generateResponse("인증번호가 일치하지 않습니다.", HttpStatus.ACCEPTED);
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

}