package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.request.authRequestDto.AuthenticationRequestDto;
import com.bphTeam.bikePartsHub.dto.request.authRequestDto.RegisterRequestDto;
import com.bphTeam.bikePartsHub.dto.response.authResponseDto.AuthenticationResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthenticationService {

    AuthenticationResponseDto register(RegisterRequestDto request);

    AuthenticationResponseDto authenticate(AuthenticationRequestDto request);

    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;

    void initializeUser();
}
