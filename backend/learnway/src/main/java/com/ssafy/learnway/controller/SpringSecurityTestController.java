package com.ssafy.learnway.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SpringSecurityTestController {
    @GetMapping("/")
    public String home() {
        return "<h1>Welcome home!</h1>";
    }

    @GetMapping("/main")
    public String home(Authentication authentication) {
        //  authentication.getName() : username
        return "<h1>Welcome user : 인증, 인가 x </h1>";
    }

    @GetMapping("/user")
    public String admin(Authentication authentication) {
        return "<h1>Welcome " + authentication.getName()+ "!</h1>";
    }
}
