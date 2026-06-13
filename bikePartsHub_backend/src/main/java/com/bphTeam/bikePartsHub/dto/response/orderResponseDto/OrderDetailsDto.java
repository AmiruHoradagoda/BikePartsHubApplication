package com.bphTeam.bikePartsHub.dto.response.orderResponseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDetailsDto {
    private Long orderDetailId;
    private String productName;
    private int qty;
    private String imageUrl;
    private double amount;
}
