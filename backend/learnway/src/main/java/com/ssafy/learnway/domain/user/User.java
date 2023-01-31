package com.ssafy.learnway.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.learnway.domain.BaseTime;
import com.ssafy.learnway.domain.Language;
import com.ssafy.learnway.domain.oauth.Role;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 생성자 접근 권한을 막는다.
@Table(name = "tb_user")
@ToString
public class User extends BaseTime implements UserDetails {
    @GeneratedValue(strategy=GenerationType.IDENTITY) //기본키 생성을 데이터베이스에 위임 AUTO_INCREMENT
    @Column(name="user_id", nullable = false)
    @Id
    private Long userId;
    @Column(name="user_email", nullable = false)
    private String userEmail;

    // Json결과로 출력 안 할 데이터
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name="user_pwd", nullable = false)
    private String userPwd;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    //@Temporal(TemporalType.DATE) //년-월-일 의 date 타입
    private LocalDate birthday;

    //@JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY) // 하나의 언어는 여러명의 사용자를 가진다?
    @JoinColumn(name="languageId")
    private Language languageId;

    @Column(columnDefinition = "TINYINT", length=1)
    private boolean badUser;


//    @Temporal(TemporalType.TIMESTAMP) //date + time
//    @Column(name="register_time")
//    private Date regDate;

    private String imgUrl;
    private String bio;

    private String socialType; // GOOGLE

    private String socialId; // 로그인한 소셜 타입의 식별자 값 (일반 로그인인 경우 null). GOOGLE의 경우 "sub"

    /**
     * Spring Security 회원 가입
     */
//    @ElementCollection(fetch = FetchType.EAGER)
//    @Builder.Default
//    private List<String> roles = new ArrayList<>();
//
//     //roles회원이 가지고 있는 권한 정보. 기본으로 "ROLE_USER" 세팅
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return this.roles.stream()
//                .map(SimpleGrantedAuthority::new)
//                .collect(Collectors.toList());
//    }

    @Enumerated(EnumType.STRING)
    private Role role;

        public Collection<? extends GrantedAuthority> getAuthorities() {
            Collection<GrantedAuthority> collectors = new ArrayList<>();

            collectors.add(() -> "ROLE_"+user.getRole());
    }

    @Override
    public String getPassword() {
        return userPwd;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public String getUsername() {
        return userEmail;
    }

    // 계정이 만료되었는지 여부
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정이 잠겼는지 여부
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 계정 패스워드가 만료되었는지 여부
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 계정이 사용가능한지 여부
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isEnabled() {
        return true;
    }

    public void update(String name, LocalDate birthday, Language languageId, String imgUrl, String bio ) {
        this.name = name;
        this.birthday = birthday;
        this.languageId = languageId;
        this.imgUrl = imgUrl;
        this.bio = bio;
    }

    public void update(String userPwd){
        this.userPwd = userPwd;
    }

    public User update(String userEmail, String userPwd, String name){
        this.userEmail = userEmail;
        this.userPwd = userPwd;
        this.name = name;
        return this;
    }



}
