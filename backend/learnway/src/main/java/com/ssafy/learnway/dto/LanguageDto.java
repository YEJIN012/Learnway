package com.ssafy.learnway.dto;

import com.ssafy.learnway.domain.Language;
import com.ssafy.learnway.domain.user.User;
import lombok.*;

import java.util.Collections;

@Setter
@Getter
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor
public class LanguageDto {
    int languageId;
    String name;

    public Language toEntity(){
        return Language.builder().languageId(languageId)
                .name(name).build();
    }

}
