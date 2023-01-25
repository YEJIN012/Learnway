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

    @Id
    private int relationId;

    @MapsId // @MapsId는 @id로 지정한 컬럼에 @OneToOne 이나 @ManyToOne 관계를 매핑시키는 역할
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="relation_id")
    private Friend friend;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="last_sent")
    private Date time;

    @Column(name="last_msg")
    private String msg;
}
