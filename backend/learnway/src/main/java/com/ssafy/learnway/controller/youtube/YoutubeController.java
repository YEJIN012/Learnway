package com.ssafy.learnway.controller.youtube;

import com.ssafy.learnway.domain.user.User;
import com.ssafy.learnway.dto.friend.FriendRequestDto;
import com.ssafy.learnway.dto.youtube.YoutubeRoom;
import com.ssafy.learnway.repository.youtube.YoutubeRepository;
import com.ssafy.learnway.service.user.UserService;
import com.ssafy.learnway.util.ResponseHandler;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.Arrays;

@Tag(name = "youtube")
@RestController
@RequiredArgsConstructor
@RequestMapping("/youtube")
@Slf4j
public class YoutubeController {

    private final UserService userService;
    private final YoutubeRepository youtubeRepository;

    @PostMapping("/create")
    public ResponseEntity createYoutubeRoom(@RequestBody @Parameter(name = "내 이메일, 상대방 이메일", required = true) FriendRequestDto friendRequestDto) throws SQLException {
        User user = userService.findByEmail(friendRequestDto.getUserEmail());
        User opponent = userService.findByEmail(friendRequestDto.getFriendEmail());

        if(user == null || opponent == null){
            return ResponseHandler.generateResponse("존재하지 않는 사용자입니다.", HttpStatus.BAD_REQUEST);
        }

//        String roomId = UUID.randomUUID().toString();
//        return ResponseHandler.generateResponse("대기방이 생성되었습니다", HttpStatus.ACCEPTED,"roomId",roomId);
//
        String[] arr = {user.getUserEmail(), opponent.getUserEmail()};
        Arrays.sort(arr); //정렬

        String roomId = arr[0] + arr[1];

        if(youtubeRepository.findRoomById(roomId) != null){
            return ResponseHandler.generateResponse("유튜브 통신을 위한 방", HttpStatus.OK,"roomId",roomId);
        }else{
            // 새로 생성해서 전달
            YoutubeRoom youtubeRoom = youtubeRepository.createYoutubeRoom(roomId);
            return ResponseHandler.generateResponse("유튜브방 생성 완료", HttpStatus.OK, "roomId", roomId);
        }
    }

    @DeleteMapping("/room/{roomId}")
    public ResponseEntity deleteRoom(@PathVariable String roomId) {

        if(youtubeRepository.findRoomById(roomId) == null){
            return ResponseHandler.generateResponse("검색된 채팅방이 없습니다.", HttpStatus.ACCEPTED);
        }else{
            youtubeRepository.deleteYoutubeRoom(roomId);
            return ResponseHandler.generateResponse("삭제되었습니다", HttpStatus.ACCEPTED);
        }
    }


}
