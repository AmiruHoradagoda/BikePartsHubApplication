package com.bphTeam.bikePartsHub.mapper;

import com.bphTeam.bikePartsHub.dto.response.customerResponseDto.CustomerResponse;
import com.bphTeam.bikePartsHub.user.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    CustomerResponse toCustomerResponse(User user);
}
