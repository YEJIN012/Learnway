package com.ssafy.learnway.dto;

import com.ssafy.learnway.domain.oauth.Role;
import com.ssafy.learnway.domain.user.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Getter
@Builder
public class OAuthAttributesDto {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String email;
    private String name;
    private String picture;


    // OAuth2User에서 반환하는 사용자 정보는 Map이기 때문에 값 하나하나를 변환해야 한다.
    public static OAuthAttributesDto of(String socialType, String userNameAttributeName,
                                        Map<String, Object> attributes){
        if(socialType.equals("GOOGLE")){
            return ofGoogle(userNameAttributeName, attributes);
        }
        throw new RuntimeException();
    }

    private static OAuthAttributesDto ofGoogle(String userNameAttributeName, Map<String, Object> attributes){
        return OAuthAttributesDto.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String)attributes.get("picture"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public User toEntity(){
        return User.builder()
                .socialType("GOOGLE")
                .socialId(nameAttributeKey)
                .userEmail(UUID.randomUUID()+"@gmail.com")
                .name(name)
                .roles(Collections.singletonList(Role.GUEST))
                .build();
    }

}
