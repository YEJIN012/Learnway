package com.ssafy.learnway.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_interest")
public class Interest {
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    private int interestId;
    @Column(name="interest_field")
    private String field;
}
