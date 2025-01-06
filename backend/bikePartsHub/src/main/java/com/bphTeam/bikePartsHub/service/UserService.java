package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.response.UserResponseDto;

public interface UserService {

    UserResponseDto getUserDetails(int userId);
}
