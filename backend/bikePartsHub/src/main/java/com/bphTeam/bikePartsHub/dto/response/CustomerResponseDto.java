package com.bphTeam.bikePartsHub.dto.response;

import com.bphTeam.bikePartsHub.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CustomerResponseDto {
    private User user;
    private Set<OrderResponseDto> orders;
}
