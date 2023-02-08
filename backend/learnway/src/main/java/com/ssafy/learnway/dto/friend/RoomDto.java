package com.ssafy.learnway.dto.friend;

import com.ssafy.learnway.dto.user.ProfileDto;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RoomDto implements Comparable<RoomDto> {

    private int relationId;
    private String roomId;
    private ProfileDto profileDto; // 상대방 프로필 정보
    private LocalDateTime dateTime; //최근 대화 시간
    private String msg;

    @Override
    public int compareTo(RoomDto o) {
        return o.dateTime.compareTo(o.dateTime); //최근 받은 메시지 별로 정렬
    }
}
