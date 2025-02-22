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

import static com.bphTeam.bikePartsHub.user.Role.*;
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
                                //Admin
                                .requestMatchers( "/api/v1/admin/**").hasRole(ADMIN.name())
                                //Appointment
                                .requestMatchers(GET, "/api/v1/appointment/**").permitAll()
                                .requestMatchers(POST, "/api/v1/appointment/**").hasAnyRole(ADMIN.name(), CUSTOMER.name(), LOYAL_CUSTOMER.name())
                                //Bike
                                .requestMatchers(GET, "/api/v1/bikes/**").permitAll()
                                .requestMatchers(POST, "/api/v1/bikes/**").hasRole(ADMIN.name())
                                .requestMatchers(PUT, "/api/v1/bikes/**").hasRole(ADMIN.name())
                                .requestMatchers(DELETE, "/api/v1/bikes/**").hasRole(ADMIN.name())
                                //Customer
                                .requestMatchers( "/api/v1/customer/**").hasAnyRole(CUSTOMER.name(), LOYAL_CUSTOMER.name())
                                //Order
                                .requestMatchers(POST, "/api/v1/order/**").hasAnyRole(ADMIN.name(), CUSTOMER.name(), LOYAL_CUSTOMER.name())
                                //Product
                                .requestMatchers(GET, "/api/v1/product/**").permitAll()
                                .requestMatchers(POST, "/api/v1/product/**").hasRole(ADMIN.name())
                                .requestMatchers(PUT, "/api/v1/product/**").hasRole(ADMIN.name())
                                .requestMatchers(DELETE, "/api/v1/product/**").hasRole(ADMIN.name())








                                // Public appointment endpoints
                                .requestMatchers(GET, "/api/v1/appointment/services/**").permitAll()
                                .requestMatchers(GET, "/api/v1/appointment/time-slots").permitAll()

                                // Protected appointment endpoints
                                .requestMatchers(GET, "/api/v1/appointment/appointments").hasAnyAuthority("customer:create", "loyal_customer:create", "admin:create")
                                .requestMatchers(POST, "/api/v1/appointment/appointments").hasAnyAuthority("customer:read", "loyal_customer:read", "admin:read")

                                // Product and bike endpoints
                                .requestMatchers(GET, "/api/v1/product/**").permitAll()
                                .requestMatchers(GET, "/api/v1/bikes/**").permitAll()
                                .requestMatchers(GET, "/api/v1/user/**").permitAll()
                                .requestMatchers(GET, "/api/v1/admin/**").permitAll()
                                .requestMatchers(PUT, "/api/v1/admin/**").permitAll()

                                // Admin-only operations
                                .requestMatchers(POST, "/api/v1/product/**", "/api/v1/bikes/**").hasAuthority("admin:create")
                                .requestMatchers(PUT, "/api/v1/product/**", "/api/v1/bikes/**").hasAuthority("admin:update")
                                .requestMatchers(DELETE, "/api/v1/product/**", "/api/v1/bikes/**").hasAuthority("admin:delete")

                                // Default: authenticate all others requests
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