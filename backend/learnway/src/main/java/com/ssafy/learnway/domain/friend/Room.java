package com.ssafy.learnway.domain.friend;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_room")
public class Room {
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="relation_id")
    @Id
    private Friend relationId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="last_sent")
    private Date time;

    @Column(name="last_msg")
    private String msg;
}
