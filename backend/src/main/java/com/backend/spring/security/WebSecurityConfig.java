package com.backend.spring.security;

import com.backend.spring.security.filters.JWTAuthorizationFilter;
import com.backend.spring.security.filters.JWTAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.security.config.Customizer.withDefaults;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        JWTAuthenticationFilter authenticationFilter = new JWTAuthenticationFilter(authenticationConfiguration.getAuthenticationManager());
        authenticationFilter.setFilterProcessesUrl(SecurityConstants.LOGIN_URL);

        http.cors().and().csrf().disable();
        http.authorizeRequests().anyRequest().permitAll();
        http.httpBasic(withDefaults());
        http.sessionManagement().sessionCreationPolicy(STATELESS);

        http.addFilter(authenticationFilter);
        http.addFilterBefore(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

        // TODO: Allow specific route access based on role later on
//        http.authorizeRequests().antMatchers(GET, "/api/**").permitAll();
//        http.authorizeRequests()
//                .anyRequest()
//                .hasAnyRole(SHOP_OWNER.getValue())
//                .and()
//                .httpBasic(withDefaults())
//                .sessionManagement()
//                .sessionCreationPolicy(STATELESS);

        return http.build();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("*");
            }
        };
    }
}
