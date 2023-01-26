package com.ssafy.learnway.controller.user;

import com.ssafy.learnway.dto.TokenDto;
import com.ssafy.learnway.service.MailService;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(tags = {"users"})
@RestController
@Slf4j
@RequestMapping("/users")
public class MailController {

    @Autowired
    private MailService mailService;

    @GetMapping("/verify")
    public ResponseEntity<String> mailConfirm(@RequestParam(value = "email") String userEmail) throws Exception {
        String code = mailService.sendSimpleMessage(userEmail);
        //log.info("인증코드 : " + code);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/verify")
    @ResponseBody
    public ResponseEntity verifyConfirm(@RequestParam(name = "email") String email, @RequestParam(name = "code") String value) throws Exception {
        try {
            boolean isEmail = mailService.verifyEmail(email, value);
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