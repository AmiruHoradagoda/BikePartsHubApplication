package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedUserResponseDto;
import com.bphTeam.bikePartsHub.dto.response.customerResponseDto.CustomerProfileDto;
import com.bphTeam.bikePartsHub.dto.response.customerResponseDto.CustomerResponseDto;
import com.bphTeam.bikePartsHub.user.Role;


public interface UserService {

    CustomerResponseDto getUserDetails(int userId);

    PaginatedUserResponseDto getAllCustomerDetails(String customerName, Role role, int page, int size);

    CustomerProfileDto getAllCustomerProfile(Integer id);

    String changeUserRole(int userId,Role userRole);
}
