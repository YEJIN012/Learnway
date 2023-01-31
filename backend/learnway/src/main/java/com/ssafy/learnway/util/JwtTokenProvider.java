package com.ssafy.learnway.util;

import com.ssafy.learnway.dto.TokenDto;
import com.ssafy.learnway.repository.UserRepository;
import com.ssafy.learnway.service.auth.CustomUserDetailsService;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class JwtTokenProvider {
    @Value("jwt.secret")
    private String secretKey;
    private String ROLES = "roles";
    private long accesstokenValidTime = 60 * 60 * 1000L; // 1 hour
    private long refreshtokenValidTime =  14 * 24 * 60 * 60 * 1000L; // 14 days

    @Autowired
    private final CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserRepository userRepository;

    // 객체 초기화, secretKey를 Base64로 인코딩한다. 아이디와 비번 정보를 인코딩하는 것!
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

//    // JWT 토큰 생성
//    public String createToken(String userPk, List<String> roles) {
//        // Claims은 token에 부가적인 정보 담을 수 있음
//        // Claims에 user구분을 위해 값 세팅
//        Claims claims = Jwts.claims().setSubject(userPk); // JWT payload 에 저장되는 정보단위 (sub)
//        claims.put("roles", roles); // 정보는 key / value 쌍으로 저장
//        Date now = new Date(); // 생성 날짜, 만료 날짜를 위한 Date
//
//        return Jwts.builder()
//                .setClaims(claims) // 정보 저장
//                .setIssuedAt(now) // 토큰 발행 시간 정보
//                .setExpiration(new Date(now.getTime() + tokenValidTime)) // set Expire Time
//                .signWith(SignatureAlgorithm.HS256, secretKey)  // 사용할 암호화 알고리즘과 signature 에 들어갈 secret값 세팅
//                .compact();
//    }

    // JWT 토큰 생성
    public TokenDto createTokenDto(Long userPk, List<String> roles) { //userPk = user_id

        // Claims은 token에 부가적인 정보 담을 수 있음
        // Claims에 user구분을 위해 값 세팅
        Claims claims = Jwts.claims().setSubject(String.valueOf(userPk)); // JWT payload 에 저장되는 정보단위 (sub)
        claims.put(ROLES, roles); // 정보는 key / value 쌍으로 저장
        claims.put("user_id",userPk); // user_id 값 저장

        Date now = new Date(); // 생성 날짜, 만료 날짜를 위한 Date

        String accessToken = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + accesstokenValidTime)) // set Expire Time
                .signWith(SignatureAlgorithm.HS256, secretKey)  // 사용할 암호화 알고리즘과 signature 에 들어갈 secret값 세팅
                .compact();

        String refreshToken = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setExpiration(new Date(now.getTime() + refreshtokenValidTime)) // set Expire Time
                .signWith(SignatureAlgorithm.HS256, secretKey)  // 사용할 암호화 알고리즘과 signature 에 들어갈 secret값 세팅
                .compact();

        return TokenDto.builder()
                .grantType("bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExprireDate(accesstokenValidTime)
                .build();
    }

    // 토큰에서 회원 정보 추출
    public String getUserPk(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // JWT 복호화 해서 id 얻기
    public Long getUserIdFromJwt(String token) {
        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
        return Long.parseLong(String.valueOf(claims.getBody().get("user_id")));
    }

    // JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {

        // JWT에서 claims 추출
        Claims claims = parseClaims(token);

        // 권한 정보 없음
        if(claims.get(ROLES) == null) {
            // 예외 던지기
        }
        //UserDetails userDetails = customUserDetailsService.loadUserByUsername(this.getUserPk(token)); // 토큰으로 유저 확인
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(claims.getSubject()); // pk값을 가지고 user entity 반환
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());  // 유저 정보와 권한된 정보 리턴
    }

    // JWT 복호화
    // 만료된 token일 경우, refresh token 검증 후 재발급할 수 있도록 claims 반환
    private Claims parseClaims(String token){
        try{
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
        }catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    // Http Request의 Header에서 token 값을 가져와 유효성 검사 진행 ( token parsing -> "X-AUTH-TOKEN" : "TOKEN값 (jwt)'
    // 제한된 리소스에 접근할 때 HTTP Header에 토큰 세팅하여 호출하면 유효성 검사 통해 사용자 인증 받음
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }

    // token(jwt)의 유효성 + 만료일자 확인
    public boolean validateToken(String token) {
        try {
           Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
           return true;
        } catch (JwtException | IllegalArgumentException e) {
            e.printStackTrace();
            return false;
        }
    }

}
