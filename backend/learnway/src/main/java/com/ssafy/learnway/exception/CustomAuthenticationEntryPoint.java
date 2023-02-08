package com.ssafy.learnway.exception;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 정상적인 JWT가 오지 않는 경우 Spring에서 예외처리 제어 불가능
// 1. JWT 없이 API 요청
// 2. 형식에 맞지 않거나 or 만료된 JWT 사용
// 3. 정상적인 JWT지만 권한이 없는 경우
// Spring Security가 제공하는 AuthenticationEntryPoint 상속받아 재정의하여 예외처리 제어
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        //response.sendRedirect("/exception/entrypoint");
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }

}
