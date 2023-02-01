package com.ssafy.learnway.domain.friend;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_room")
public class Room {

    @Id
    private int relationId;

    @MapsId // @MapsId는 @id로 지정한 컬럼에 @OneToOne 이나 @ManyToOne 관계를 매핑시키는 역할
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="relation_id")
    @JsonIgnore
    private Friend friend;

    private String roomId;

    @Column(name="last_sent")
    private LocalDateTime time;

    @Column(name="last_msg")
    private String msg;
}
