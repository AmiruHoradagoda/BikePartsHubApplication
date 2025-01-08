package com.bphTeam.bikePartsHub.dto.pagenated;

import com.bphTeam.bikePartsHub.dto.response.OrderResponseDto;
import com.bphTeam.bikePartsHub.dto.response.OrderResponseWithDetailsDto;
import com.bphTeam.bikePartsHub.dto.response.UserResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaginatedOrderResponseWithDetailsDto {
    Set<OrderResponseWithDetailsDto> orderResponses;
    private long dataCount;
}
