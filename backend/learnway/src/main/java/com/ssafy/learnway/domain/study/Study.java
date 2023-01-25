package com.ssafy.learnway.domain.study;

import javax.persistence.*;
import java.util.Date;

public class Study {

    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private int videoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private int userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private int friendId;

    private String script;

    @Temporal(TemporalType.TIMESTAMP) //date + time
    @Column(name="study_datetime")
    private Date regTime;
}
