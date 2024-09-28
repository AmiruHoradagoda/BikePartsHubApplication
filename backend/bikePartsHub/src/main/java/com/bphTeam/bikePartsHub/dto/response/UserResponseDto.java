package com.bphTeam.bikePartsHub.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private long userId;
    private String userName;
    private String email;
    private String userRole;
    private String mobileNumber;
}