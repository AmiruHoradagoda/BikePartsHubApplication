package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.response.CustomerResponseDto;
import com.bphTeam.bikePartsHub.dto.response.UserResponseDto;
import com.bphTeam.bikePartsHub.user.Role;

import java.util.Set;

public interface UserService {

    UserResponseDto getUserDetails(int userId);

    Set<UserResponseDto> getAllCustomerDetails(String customerName, Role role, int page, int size);
}
