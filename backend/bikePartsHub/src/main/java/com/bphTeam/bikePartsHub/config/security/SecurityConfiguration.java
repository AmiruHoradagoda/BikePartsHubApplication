package com.bphTeam.bikePartsHub.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfiguration {
    private static final String[] WHITE_LIST_URL = {
            "/api/v1/auth/**",
            "/swagger-ui/**",
            "/swagger-resources/**",
            "/swagger-resources",
            "/v3/api-docs/**",
            "/swagger-ui.html",
    };
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req
                                // Whitelist public URLs
                                .requestMatchers(WHITE_LIST_URL).permitAll()
                                .requestMatchers("/api/v1/appointment/**").permitAll()
                                .requestMatchers("/api/v1/order/**").permitAll()
                                .requestMatchers(GET, "/api/v1/product/**").permitAll()
                                .requestMatchers(GET, "/api/v1/bikes/**").permitAll()
                                .requestMatchers(GET, "/api/v1/user/**").permitAll()
                                .requestMatchers(GET, "/api/v1/admin/**").permitAll()
                                .requestMatchers(PUT, "/api/v1/admin/**").permitAll()

                                // Allow POST, PUT, DELETE only for ADMIN
                                .requestMatchers(POST, "/api/v1/product/**", "/api/v1/bikes/**").hasAuthority("admin:create")
                                .requestMatchers(PUT, "/api/v1/product/**", "/api/v1/bikes/**").hasAuthority("admin:update")
                                .requestMatchers(DELETE, "/api/v1/product/**", "/api/v1/bikes/**").hasAuthority("admin:delete")

                                // Default: authenticate all other requests
                                .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                        .logoutUrl("/api/v1/auth/logout")
                        .addLogoutHandler(logoutHandler)
                        .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                );

        return http.build();
    }
}