package com.ssafy.learnway.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_content")
public class Contents {
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private int contentsId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String contents;
}
