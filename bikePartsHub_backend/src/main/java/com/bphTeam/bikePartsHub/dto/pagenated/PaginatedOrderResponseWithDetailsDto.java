package com.bphTeam.bikePartsHub.dto.pagenated;

import com.bphTeam.bikePartsHub.dto.response.orderResponseDto.OrderResponseWithDetailsDto;
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
