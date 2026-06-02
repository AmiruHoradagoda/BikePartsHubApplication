package com.bphTeam.bikePartsHub.dto.request.authRequestDto;

import com.bphTeam.bikePartsHub.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String address;
    private String phone;
    private Role role;
}