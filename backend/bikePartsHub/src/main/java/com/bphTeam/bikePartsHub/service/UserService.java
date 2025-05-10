package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedUserResponseDto;
import com.bphTeam.bikePartsHub.dto.request.userRequestDto.UserUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.response.UserResponseDto;
import com.bphTeam.bikePartsHub.dto.response.customerResponseDto.CustomerProfileDto;
import com.bphTeam.bikePartsHub.dto.response.customerResponseDto.CustomerResponseDto;
import com.bphTeam.bikePartsHub.user.Role;
import com.bphTeam.bikePartsHub.user.User;


public interface UserService {

    CustomerResponseDto getUserDetails(int userId);

    PaginatedUserResponseDto getAllCustomerDetails(String customerName, Role role, int page, int size);

    CustomerProfileDto getAllCustomerProfile(Integer id);

    String changeUserRole(int userId,Role userRole);

    UserResponseDto updateUserProfile(Integer id, UserUpdateRequestDto user);
}
