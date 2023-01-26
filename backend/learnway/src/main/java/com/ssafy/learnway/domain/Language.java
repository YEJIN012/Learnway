package com.ssafy.learnway.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_language")
@ToString
public class Language {
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="language_id")
    @Id
    private int languageId;
    @Column(name="language_name")
    private String name;
}
