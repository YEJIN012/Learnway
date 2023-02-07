package com.ssafy.learnway.controller.user;


import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.user.TokenDto;
import com.ssafy.learnway.dto.user.TokenRequestDto;
import com.ssafy.learnway.dto.user.UserDto;
import com.ssafy.learnway.service.user.UserService;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.time.LocalDate;

@Tag(name = "sign")
@RestController
@RequestMapping("/users")
@Slf4j
public class SignController {
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     *   프론트 단 예시 => 급하게 찾아본거라 확인 필요!
     *   useEffect(() => {
     *     localStorage.clear();
     *     localStorage.setItem("X-AUTH-TOKEN", 받은accesstoken); // 토큰 저장
     *     window.location.replace("/");
     *   }, []);
     *   cf) https://sudo-minz.tistory.com/78
     * **/

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

    // 로그아웃 시 refresh token 삭제
    @GetMapping("/logout/{userEmail}")
    public ResponseEntity logout(@PathVariable String userEmail,HttpServletRequest request, HttpServletResponse response){
        try {
            userService.logout(userEmail);

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null) {
                new SecurityContextLogoutHandler().logout(request, response, authentication);

                HttpSession session = request.getSession();
                if (session != null) {
                    session.invalidate();
                }
            }

            return ResponseHandler.generateResponse("로그아웃에 성공하였습니다.",HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("로그아웃에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/sign-up")
    public ResponseEntity signup(@RequestBody UserDto userDto) {

        try {
            if(!userDto.getProvider().equals("GOOGLE")){ // 구글 소셜 로그인이면 비밀번호 필요없음
                if(userDto.getUserPwd().equals("")){
                    return ResponseHandler.generateResponse("회원가입 정보를 모두 입력해주세요.", HttpStatus.ACCEPTED);
                }
            }
            // 정보 미입력시 리턴
            if(userDto.getInterests()==null||userDto.getLanguage()==null||userDto.getName().equals("")||userDto.getUserEmail().equals("")){
                return ResponseHandler.generateResponse("회원가입 정보를 모두 입력해주세요.", HttpStatus.ACCEPTED);
            }

            // 관심 분야 3개 이상 체크
            if(userDto.getInterests().size()<3){
                return ResponseHandler.generateResponse("관심분야를 3개 이상 선택해주세요.", HttpStatus.ACCEPTED);
            }

            // 닉네임 한번 더 중복 체크
            User user = userService.dupName(userDto.getName());
            if(user!=null){
                return ResponseHandler.generateResponse("사용중인 닉네임입니다. 회원가입에 실패하였습니다.", HttpStatus.ACCEPTED);
            }

            userDto.setUserPwd(passwordEncoder.encode(userDto.getUserPwd()));
            // DB 초기화
            userDto.setBadUser(false);
            userDto.setBio("HI");
            userDto.setImgUrl("8c078de680914140a37360b079c0c23e.png"); // 기본 이미지

            userService.signUp(userDto);
            userDto.setUserPwd(null);

            //UserDto savedUserDto = userService.userInfo(userDto.getUserEmail());

            return ResponseHandler.generateResponse("회원가입에 성공하였습니다.", HttpStatus.OK, "user", userDto);
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

//    @PostMapping("/refreshToken")
//    public ResponseEntity refreshTokenTest(HttpServletRequest request, HttpServletResponse response){
//        try {
//
//
//            TokenDto newCreatedToken = userService.refreshToken(tokenRequestDto);
//            return ResponseHandler.generateResponse("Refresh token 재발급에 성공하였습니다.",HttpStatus.OK,"token",newCreatedToken);
//        } catch (Exception e) {
//            return ResponseHandler.generateResponse("Refresh token 재발급에 실패하였습니다.", HttpStatus.BAD_REQUEST);
//        }
//
//    }


    // http://localhost:8080/oauth2/authorization/google : 프론트에 사용할 구글 소셜 로그인 버튼
//    @GetMapping("/oauth2/login")
//    public ResponseEntity oAuthLogin(Authentication authentication , @AuthenticationPrincipal OAuth2User oauth){// DI(의존성주입)
//
//        try {
//            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
//            String userEmail = oAuth2User.getAttributes().get("email").toString();
//            log.info(userEmail);
//            TokenDto tokenDto = userService.oAuthLogin(userEmail);
//            UserDto userDto = userService.userInfo(userEmail); // 유저확인
//
//            return ResponseHandler.generateResponse("구글 로그인 성공", HttpStatus.OK, "token", tokenDto, "user",userDto, "flag", true);
//        }catch (Exception e){
//            return ResponseHandler.generateResponse("구글 로그인에 실패하였습니다.", HttpStatus.BAD_REQUEST);
//        }
//
//    }

    @GetMapping("/oauth2/login")
    public void oAuthLogin(Authentication authentication , @AuthenticationPrincipal OAuth2User oauth,  HttpServletResponse response){// DI(의존성주입)

        try {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String userEmail = oAuth2User.getAttributes().get("email").toString();
            log.info(userEmail);
            TokenDto tokenDto = userService.oAuthLogin(userEmail);
            //UserDto userDto = userService.userInfo(userEmail); // 유저확인

            log.info("google login....");

            response.sendRedirect(UriComponentsBuilder.fromUriString("https://i8a408.p.ssafy.io/logincheck")
                    .queryParam("accessToken", tokenDto.getAccessToken())
                    .queryParam("refreshToken", tokenDto.getRefreshToken())
                    .queryParam("userEmail",userEmail)
                    .queryParam("flag",1)
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString());


        }catch (Exception e){
            e.printStackTrace();
        }

    }

    @GetMapping("/oauth2/signup")
    public void oAuthSignUp(Authentication authentication , @AuthenticationPrincipal OAuth2User oauth, HttpServletResponse response){
        try {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String userEmail = oAuth2User.getAttributes().get("email").toString();
            String name = oAuth2User.getAttributes().get("name").toString();
            String provider = "GOOGLE";
            String providerId = oAuth2User.getAttribute("sub");

            log.info("google sign up....");


//            upUserDto userDto = UserDto.builder()
//                    .provider(provider)
//                    .providerId(providerId)
//                    .userEmail(userEmail)
//                    .name(name)
//                    .build(); // 비밀번호에 따른 변수 넣어서 프론트에서 쉽게 처리가능하다면 바꾸기!!
//
//
//            userDto.setUserPwd("1234");
//            userService.signUp(userDto);


            response.sendRedirect(UriComponentsBuilder.fromUriString("https://i8a408.p.ssafy.io/logincheck")
                    .queryParam("userEmail",userEmail)
                    .queryParam("name",name)
                    .queryParam("provider",provider )
                    .queryParam("providerId",providerId)
                    .queryParam("flag",0)
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString());

        }catch (Exception e){
            e.printStackTrace();
        }

    }

}
