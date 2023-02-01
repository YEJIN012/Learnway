package com.ssafy.learnway.dto;

import com.ssafy.learnway.domain.user.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Collections;
import java.util.Map;
import java.util.UUID;

@Getter
@Builder
public class OAuthAttributesDto {
    private Map<String, Object> attributes;

    // OAuth2User에서 반환하는 사용자 정보는 Map이기 때문에 값 하나하나를 변환해야 한다.
    public static OAuthAttributesDto of(String socialType,
                                        Map<String, Object> attributes){
        if(socialType.equals("google")){
            return ofGoogle(attributes);
        }
        throw new RuntimeException();
    }

    private static OAuthAttributesDto ofGoogle(Map<String, Object> attributes){
        return OAuthAttributesDto.builder()
                .attributes(attributes)
                .build();
    }

    public User toEntity(){
        return User.builder()
                .socialType("GOOGLE")
                .socialId((String) attributes.get("sub"))
                .userEmail((String) attributes.get("email"))
                .name("google_"+(String) attributes.get("name"))
                .roles(Collections.singletonList("ROLE_GUEST"))
                .build();
    }

}
