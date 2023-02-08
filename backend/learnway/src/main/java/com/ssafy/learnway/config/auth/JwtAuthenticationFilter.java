package com.ssafy.learnway.config.auth;

import com.ssafy.learnway.exception.TokenValidFailedException;
import com.ssafy.learnway.util.JwtTokenProvider;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

// 해당 필터를 UsernamePasswordAuthenticationFilter 앞에 세팅
// 해당 필터를 이용해서 토근 유효성 검증 후 JWT로부터 유저 정보를 받아 UsernamePasswordAuthenticationFilter로 전달
// 해당 필터를 SecurityConfig 파일에 등록해주는 과정이 필요!
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;
    @Value("${jwt.secret}")
    private String secretKey;

    // request로 들어오는 Jwt 유효성 검증
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {


        // HTTP 요청의 헤더에서 JWT를 받아옴
        String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);

        log.info("[Verifying token] url : ");
        log.info(((HttpServletRequest)request).getRequestURL().toString());

        // 유효한 토큰인지 확인
        if(token != null ){

            try {
                Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);

                // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옴
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                // SecurityContext 에 Authentication 객체를 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (JwtException | IllegalArgumentException e) {
                log.error("유효하지 않은 토큰입니다. {}", e.getMessage());
            }
//            if (jwtTokenProvider.validateToken(token)) { // 유용하지 않으면 예외발생
//                    // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옴
//                    Authentication authentication = jwtTokenProvider.getAuthentication(token);
//                    // SecurityContext 에 Authentication 객체를 저장
//                    SecurityContextHolder.getContext().setAuthentication(authentication);
//                }
        }

        // JwtTokenProvider.validateToken()을 필터로 FilterChain에 추가
        chain.doFilter(request, response);
    }
}
