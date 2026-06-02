package com.bphTeam.bikePartsHub.service.impl;

import com.bphTeam.bikePartsHub.dto.request.authRequestDto.AuthenticationRequestDto;
import com.bphTeam.bikePartsHub.dto.request.authRequestDto.RegisterRequestDto;
import com.bphTeam.bikePartsHub.dto.response.authResponseDto.AuthenticationResponseDto;
import com.bphTeam.bikePartsHub.service.AuthenticationService;
import com.bphTeam.bikePartsHub.service.JwtService;
import com.bphTeam.bikePartsHub.entity.Token;
import com.bphTeam.bikePartsHub.repository.TokenRepository;
import com.bphTeam.bikePartsHub.entity.enums.TokenType;
import com.bphTeam.bikePartsHub.entity.enums.Role;
import com.bphTeam.bikePartsHub.entity.User;
import com.bphTeam.bikePartsHub.repository.UserRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepo repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponseDto register(RegisterRequestDto request) {
        if (repository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("User email already taken");
        }

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .address(request.getAddress())
                .phone(request.getPhone())
                .role(request.getRole())
                .build();
        var savedUser = repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponseDto.builder()
                .userId(savedUser.getUserId())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public AuthenticationResponseDto authenticate(AuthenticationRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponseDto.builder()
                .userId(user.getUserId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getUserId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    @Override
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUserName(refreshToken);
        if (userEmail != null) {
            var user = this.repository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponseDto.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

    @Override
    public void initializeUser() {
        String adminEmail = "admin@example.com";
        String customerEmail = "customer@example.com";
        // Check if admin already exists
        if (!repository.existsByEmail(adminEmail)) {
            // Create admin user
            var adminUser = User.builder()
                    .firstName("Amiru")
                    .lastName("Horadagoda")
                    .email(adminEmail)
                    .password(passwordEncoder.encode("admin@123"))
                    .address("Admin Address")
                    .phone("1234567890")
                    .role(Role.ADMIN)
                    .build();


            // Save the admin user
            repository.save(adminUser);

            // Log admin creation
            System.out.println("Admin user initialized with email: " + adminEmail);
        } else {
            System.out.println("Admin user already exists");
        }


        // Check if customer already exists
        if (!repository.existsByEmail(customerEmail)) {
            // Create Customer
            var customerUser = User.builder()
                    .firstName("Amiru")
                    .lastName("Horadagoda")
                    .email(customerEmail)
                    .password(passwordEncoder.encode("customer@123"))
                    .address("Badulla,SriLanka")
                    .phone("0717244872")
                    .role(Role.CUSTOMER)
                    .build();
            // Save the customer user
            repository.save(customerUser);

            // Log customer creation
            System.out.println("Customer user initialized with email: " + customerEmail);
        } else {
            System.out.println("Customer user already exists");
        }



    }
}
