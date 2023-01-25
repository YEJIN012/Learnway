package com.ssafy.learnway.controller.user;

import com.ssafy.learnway.service.MailService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Api(tags = {"users"})
@RestController
@Slf4j
@RequestMapping("/users")
public class MailController {

    @Autowired
    private MailService mailService;

    @GetMapping("/verify")
    public String mailConfirm(@RequestParam(value = "email") String userEmail) throws Exception {
        String code = mailService.sendSimpleMessage(userEmail);
        //log.info("인증코드 : " + code);
        return code;
    }
}