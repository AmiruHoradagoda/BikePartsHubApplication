package com.bphTeam.bikePartsHub.dto.request.userRequestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequestDto {
    private String userName;
    private String email;
    private String userRole;
    private String mobileNumber;
}