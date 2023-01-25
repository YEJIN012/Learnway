package com.ssafy.learnway.domain.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.learnway.domain.Language;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 생성자 접근 권한을 막는다.
@Table(name = "tb_user")
public class User implements UserDetails {
    @GeneratedValue(strategy=GenerationType.IDENTITY) //기본키 생성을 데이터베이스에 위임 AUTO_INCREMENT
    @Column(name="user_id")
    @Id
    private Long userId;
    @Column(name="user_email")
    private String userEmail;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name="user_pwd")
    private String userPwd;
    private String name;
    @Temporal(TemporalType.DATE) //년-월-일 의 date 타입
    private Date birthday;

    @ManyToOne(fetch = FetchType.LAZY) // 하나의 언어는 여러명의 사용자를 가진다?
    @JoinColumn(name="languageId")
    private Language languageId;

    @Column(columnDefinition = "TINYINT", length=1)
    private boolean badUser;

    @Temporal(TemporalType.TIMESTAMP) //date + time
    @Column(name="register_time")
    private Date regDate;

    private String imgUrl;
    private String bio;


    /**
     * Spring Security 회원 가입
     */
    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    // roles회원이 가지고 있는 권한 정보. 기본으로 "ROLE_USER" 세팅
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
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
}
