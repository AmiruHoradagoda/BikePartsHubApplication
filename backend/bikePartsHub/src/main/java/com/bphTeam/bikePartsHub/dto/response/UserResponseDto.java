package com.bphTeam.bikePartsHub.dto.response;

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
public class UserResponseDto {
    private int userId;
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private Set<OrderResponseDto> orders;
}