package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.request.authRequestDto.AuthenticationRequestDto;
import com.bphTeam.bikePartsHub.dto.request.authRequestDto.RegisterRequestDto;
import com.bphTeam.bikePartsHub.dto.response.authResponseDto.AuthenticationResponseDto;
import com.bphTeam.bikePartsHub.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth/")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    @PreAuthorize("permitAll()")
    public ResponseEntity<AuthenticationResponseDto> register(
            @RequestBody RegisterRequestDto request
    ){
        return ResponseEntity.ok(service.register(request));
    }


    @PostMapping("/authenticate")
    @PreAuthorize("permitAll()")
    public ResponseEntity<AuthenticationResponseDto> authenticate(
            @RequestBody AuthenticationRequestDto request
    ){
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh-token")
    @PreAuthorize("permitAll()")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        service.refreshToken(request,response);
    }



}
