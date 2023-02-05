package com.ssafy.learnway.dto.language;

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

    String code;

    public Language toEntity(){
        return Language.builder().languageId(languageId)
                .languageName(name)
                .languageCode(code)
                .build();
    }

}
