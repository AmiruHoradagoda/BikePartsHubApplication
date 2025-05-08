package com.bphTeam.bikePartsHub.dto.response.customerResponseDto;

import com.bphTeam.bikePartsHub.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CustomerResponse {
    private int userId;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phone;
    private Role role;
}
