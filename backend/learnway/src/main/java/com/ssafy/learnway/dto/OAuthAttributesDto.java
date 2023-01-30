package com.ssafy.learnway.dto;

import com.ssafy.learnway.domain.user.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Getter
@Builder
public class OAuthAttributesDto {
    private Map<String, Object> attributes;
    private String attributeKey;
    private String email;
    private String name;
    private String picture;

    // OAuth2User에서 반환하는 사용자 정보는 Map이기 때문에 값 하나하나를 변환해야 한다.
    public static OAuthAttributesDto of(String provider, String attributeKey,
                                        Map<String, Object> attributes){
        if(provider.equals("google")){
            return ofGoogle(attributeKey, attributes);
        }
        throw new RuntimeException();
    }

    private static OAuthAttributesDto ofGoogle(String attributeKey, Map<String, Object> attributes){
        return OAuthAttributesDto.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String)attributes.get("picture"))
                .attributes(attributes)
                .attributeKey(attributeKey)
                .build();
    }

    public Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", attributeKey);
        map.put("key", attributeKey);
        map.put("name", name);
        map.put("email", email);
        map.put("picture", picture);

        return map;
    }

    public User toEntity(){
        return User.builder()
                .userEmail(email)
                .name(name)
                .roles(Collections.singletonList("ROLE_USER"))
                .build();
    }
}
