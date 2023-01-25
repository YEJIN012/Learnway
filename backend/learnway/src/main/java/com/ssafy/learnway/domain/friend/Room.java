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
public class Room {
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="relation_id")
    @Id
    private Friend relationId;

    @Column(name="last_sent")
    private Date time;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="last_msg")
    private String msg;
}
