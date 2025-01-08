package com.bphTeam.bikePartsHub.dto.pagenated;

import com.bphTeam.bikePartsHub.dto.response.UserResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaginatedUserResponseDto {
    Set<UserResponseDto> userResponseDtos;
    private long dataCount;
}
