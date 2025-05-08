package com.bphTeam.bikePartsHub.dto.response.customerResponseDto;

import com.bphTeam.bikePartsHub.dto.response.orderResponseDto.OrderResponseDto;
import com.bphTeam.bikePartsHub.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerResponseDto {
    private int userId;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phone;
    private Role role;
    private Set<OrderResponseDto> orders;
}