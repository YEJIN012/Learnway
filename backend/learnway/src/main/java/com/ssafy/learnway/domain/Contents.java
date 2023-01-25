package com.ssafy.learnway.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_content")
public class Contents {
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private int contentsId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String contents;
}
