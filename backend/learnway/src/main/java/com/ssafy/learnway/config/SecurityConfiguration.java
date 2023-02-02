package com.ssafy.learnway.config;

import com.ssafy.learnway.config.auth.JwtAuthenticationFilter;
import com.ssafy.learnway.config.auth.JwtAuthenticationFilter;
import com.ssafy.learnway.exception.CustomAccessDeniedHandler;
import com.ssafy.learnway.exception.CustomAuthenticationEntryPoint;
import com.ssafy.learnway.service.auth.CustomUserDetailsService;
import com.ssafy.learnway.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity // spring security를 구성하는 기본적인 기능을 자동으로 빌딩
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{
    @Autowired
    private final JwtTokenProvider jwtTokenProvider;
    @Autowired
    private final CustomUserDetailsService customUserDetailsService;
    private static final String[] PERMIT_URL_ARRAY = {
            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**"
    };

    // 저장소에서 가져온 인코딩된 암호(encodedPassword)가 인코딩 된 후 제출된 원시 암호(raw password)와 일치하는지 확인
    // 일치하면 true 반환. 불일치하면 false 반환.
    // 저장된 암호는 디코딩하지 않음
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

     // 인증, 인가가 필요없는 페이지 설정
     @Override
     public void configure(WebSecurity web) throws Exception {
          web.ignoring().antMatchers();
     }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
         // userDetailsService() : 인증 과정에서 사용할 UserDetailsService를 설정
         // passwordEncoder() : 인증 과정에서 사용할 passwordEncoder를 설정
         auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
    }

     // 인증, 인가가 필요한 페이지 설정
     @Override
     public void configure(HttpSecurity http) throws Exception {
         http
                  // 기본 REST API만 사용하므로 기본 설정 비활성화
                 .httpBasic().disable()
                 // csrf : post방식으로 값을 전송시, token을 사용해야되는 보안 설정 비활성화
                 .csrf().disable()
//                 .cors().configurationSource(corsConfigurationSource())
//                 .and()

                 //
//                 .formLogin()// form 기반 로그인 관련 설정.
//                 .loginPage("/")// 로그인 요청 URL
//                 .defaultSuccessUrl("/success")// 로그인 성공 시 연결 URL
                 //
//                 .and()
                 .authorizeRequests() //antMatchers()를 통해 접근 URL에 대한 권한을 설정
                 .antMatchers("/*/login","/*/sign-up").permitAll()
                 .antMatchers(PERMIT_URL_ARRAY).permitAll() // swagger api 접근
                 .antMatchers("/**").permitAll()
                 .anyRequest().hasRole("USER")
                 //.antMatchers("/user/**").hasRole("USER") // 특정 role 유저 접근 가능
                 //.anyRequest().permitAll() // 나머지 path는 모두 접근 가능
                 //
                 .and()
                 .logout()
                 .logoutUrl("/logout") // 로그아웃 후 세션 모두 삭제 후
                 .logoutSuccessUrl("/") // 해당 path로 redirect
                 //
                 .and()
                 .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint()) // spring securiy 에러(비정상적인 token)
                 .and()
                 .exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler())  // spring securiy 에러(권한 없음)
                 .and()
                 // JwtAuthenticationFilter를 UsernamePasswordAuthenticationFilter 앞에 설정
                 .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // configuration.addAllowedOrigin("*");
        // config.addAllowedOrigin("*");
        configuration.addAllowedOriginPattern("*"); // addAllowedOriginPattern("*") 대신 사용
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
