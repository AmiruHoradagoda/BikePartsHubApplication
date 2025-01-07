package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.response.CustomerResponseDto;
import com.bphTeam.bikePartsHub.dto.response.UserResponseDto;

import java.util.Set;

public interface UserService {

    UserResponseDto getUserDetails(int userId);

    Set<CustomerResponseDto> getAllCustomerDetails(int page,int size);
}
