package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.request.userRequestDto.UserSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.userRequestDto.UserUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.response.UserResponseDto;

import java.util.List;

public interface UserService {
    String addUser(UserSaveRequestDto userDto);

    String updateUser(long userId, UserUpdateRequestDto userDto);

    String deleteUser(long userId);

    List<UserResponseDto> getAllUsers();

    UserResponseDto getUserById(long userId);
}
