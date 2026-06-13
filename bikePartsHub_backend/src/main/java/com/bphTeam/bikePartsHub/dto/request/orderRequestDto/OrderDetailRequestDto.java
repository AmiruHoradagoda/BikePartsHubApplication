package com.bphTeam.bikePartsHub.dto.request.orderRequestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderDetailRequestDto {
    private String productName;
    private int qty;
    private double amount;
    private Long productId;
}
