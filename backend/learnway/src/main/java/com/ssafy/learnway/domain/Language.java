package com.ssafy.learnway.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_language")
public class Language {
    @Column(name="language_id")
    @Id
    private int languageId;
    @Column(name="language_name")
    private String name;
}
