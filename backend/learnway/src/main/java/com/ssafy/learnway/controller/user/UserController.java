package com.ssafy.learnway.controller.user;

import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.interest.InterestDto;
import com.ssafy.learnway.dto.language.LanguageDto;
import com.ssafy.learnway.dto.user.ProfileDto;
import com.ssafy.learnway.dto.user.PwdDto;
import com.ssafy.learnway.dto.user.UserDto;
import com.ssafy.learnway.service.user.UserService;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "users")

@RestController
@RequestMapping("/users") // 추후에 user로 바꿔야함
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 회원 조회
    @GetMapping("/{userEmail}")
    public ResponseEntity findUserByEmail(@PathVariable String userEmail){
        if(userEmail==null) {
            return ResponseHandler.generateResponse("이메일을 입력해주세요.", HttpStatus.ACCEPTED);
        }
        try {
            UserDto userDto = userService.userInfo(userEmail); // 유저 조회
            if(userDto!=null){
                return ResponseHandler.generateResponse("회원정보가 조회되었습니다.", HttpStatus.OK,"user",userDto);
            }else {
                return ResponseHandler.generateResponse("존재하지 않는 회원입니다.", HttpStatus.ACCEPTED);
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse("회원 정보 요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    // 닉네임 중복
    @GetMapping("/dupName")
    public ResponseEntity dupName(@RequestParam String name){
        try {
            if(name==null||name.equals("")){
                return ResponseHandler.generateResponse("닉네임을 입력해주세요.", HttpStatus.ACCEPTED);
            }
            User user = userService.dupName(name);
            if(user==null){
                return ResponseHandler.generateResponse("사용가능한 닉네임입니다.", HttpStatus.ACCEPTED);
            }
            return ResponseHandler.generateResponse("사용중인 닉네임입니다. ", HttpStatus.ACCEPTED);
        } catch (Exception e){
            return ResponseHandler.generateResponse("닉네임 요청에 실패하였습니다.", HttpStatus.ACCEPTED);
        }

    }

    // 회원 정보 수정
    @PutMapping("/modify")
    public ResponseEntity modifyUser(@RequestPart UserDto userDto, @RequestPart(value = "image", required = false) final MultipartFile multipartFile) {
        // 정보 미입력시 리턴
        if(userDto.getInterests()==null||userDto.getLanguage()==null||userDto.getName().equals("")||userDto.getUserEmail().equals("")){
            return ResponseHandler.generateResponse("정보를 모두 입력해주세요.", HttpStatus.ACCEPTED);
        }

        // 관심 분야 3개 이상 체크
        if(userDto.getInterests().size()<3){
            return ResponseHandler.generateResponse("관심분야를 3개 이상 선택해주세요.", HttpStatus.ACCEPTED);
        }

        try{
            // 자신의 닉네임과 다르면 닉네임 중복 체크 진행
            UserDto checkUserDto = userService.userInfo(userDto.getUserEmail());
            if(!checkUserDto.getName().equals(userDto.getName())) {
                // 닉네임 한번 더 중복 체크
                User user = userService.dupName(userDto.getName());
                if (user != null) {
                    return ResponseHandler.generateResponse("사용중인 닉네임입니다. 회원 정보 수정에 실패하였습니다.", HttpStatus.ACCEPTED);
                }
            }

            userService.modifyUser(userDto,multipartFile);

            UserDto responseUserDto = userService.userInfo(userDto.getUserEmail());
            return ResponseHandler.generateResponse("회원 정보가 수정되었습니다.", HttpStatus.ACCEPTED, "user", responseUserDto);

        }catch (Exception e){
            return ResponseHandler.generateResponse("회원 정보 수정 요청에 실패하였습니다.", HttpStatus.ACCEPTED);
        }

    }

    // 회원 프로필 조회
    @GetMapping("/profile/{userEmail}")
    public ResponseEntity getProfile(@PathVariable String userEmail){
        try{
            ProfileDto profileDto = userService.getProfile(userEmail);
            return ResponseHandler.generateResponse("프로필이 조회되었습니다.",HttpStatus.ACCEPTED, "profile",profileDto);
        } catch (Exception e){
            return ResponseHandler.generateResponse("프로필 조회에 실패하였습니다.",HttpStatus.ACCEPTED);
        }
    }

    // 언어 목록 가져오기
    @GetMapping("/interest")
    public ResponseEntity getInterest(){
        try {
            List<InterestDto> interestDtos = userService.getInterest();
            return ResponseHandler.generateResponse("관심분야 리스트 조회에 성공하였습니다.",HttpStatus.ACCEPTED, "interests", interestDtos);
        } catch (Exception e){
            return ResponseHandler.generateResponse("관심분야 리스트 조회에 실패하였습니다.",HttpStatus.ACCEPTED);
        }
    }

    // 관심 목록 가져오기(16개의 관심목록) /users/language
    @GetMapping("/language")
    public ResponseEntity getLanguage(){
        try{
            List<LanguageDto> languageDtos = userService.getLanguage();
            return ResponseHandler.generateResponse("언어 리스트 조회에 성공하였습니다.",HttpStatus.ACCEPTED, "language", languageDtos);
        } catch (Exception e){
            return ResponseHandler.generateResponse("언어 리스트 조회에 실패하였습니다.",HttpStatus.ACCEPTED);
        }
    }

    // 비밀번호 수정
    // 비밀번호 찾기 후 수정 : 이메일 인증(userEmail)후, userEmail과 newPassword, newPasswordConfirm
    // 회원 정보에서 비밀번호 수정 : userEmail, newPassword, newPasswordConfirm
    @PutMapping("/modify/userPwd")
    public ResponseEntity modifyPwd(@RequestBody PwdDto pwdDto){
        try {
            if(!pwdDto.getNewPassword().equals(pwdDto.getNewPasswordConfirm())) {
                return ResponseHandler.generateResponse("입력한 새 패스워드가 일치하지 않습니다.", HttpStatus.ACCEPTED, "pwd", pwdDto);
            }
            pwdDto.setNewPassword(passwordEncoder.encode(pwdDto.getNewPasswordConfirm()));

            userService.modifyPwd(pwdDto);

            return ResponseHandler.generateResponse("비밀번호가 수정되었습니다.",HttpStatus.ACCEPTED);
        } catch (Exception e){
            return ResponseHandler.generateResponse("비밀번호 수정에 실패하였습니다.",HttpStatus.ACCEPTED);
        }
    }

}
