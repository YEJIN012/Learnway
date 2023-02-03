package com.ssafy.learnway.dto;

import com.ssafy.learnway.domain.Language;
import lombok.*;

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
