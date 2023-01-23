package com.ssafy.learnway.cofig;

import com.ssafy.learnway.service.auth.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity // spring security를 구성하는 기본적인 기능을 자동으로 빌딩
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{
    @Autowired
    CustomUserDetailsService customUserDetailsService;

     // 인증, 인가가 필요없는 페이지 설정
     @Override
     public void configure(WebSecurity web) throws Exception {
          web.ignoring().antMatchers("/");
     }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
         auth.userDetailsService(customUserDetailsService);
    }
     // 인증, 인가가 필요한 페이지 설정
     @Override
     public void configure(HttpSecurity http) throws Exception {
          http
                  .csrf().disable() // csrf : post방식으로 값을 전송시, token을 사용해야되는 보안 설정 => csrf 기능 disable
                  .authorizeRequests()
                  .antMatchers("/","/main").permitAll() // 해당 path는 모든 사람 접근 가능
                  .antMatchers("/securepage","/members/**").hasRole("USER") // 해당 path는 로그인 인증 + USER라는 권한이 있어야 접근 가능
                  .anyRequest().authenticated() // 그 외의 모든 path는 인증, 인가를 거쳐야함
                  .and()
                    .formLogin() // 로그인 폼 설정
                    .loginPage("/users/login")// 로그인 요청 url
                    .usernameParameter("userEmail")
                    .passwordParameter("userPwd")
                    .loginProcessingUrl("/authenticate")
                    .failureForwardUrl("/members/loginerror?login_error=1")
                    .defaultSuccessUrl("/",true)
                    .permitAll()
                 .and()
                    .logout()
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("/");
     }

     // 암호 인코딩 or 인코딩된 암호와 사용자가 입력한 암호가 같은지 확인
     @Bean
     public PasswordEncoder encoder() {
          return new BCryptPasswordEncoder();
     }


}
