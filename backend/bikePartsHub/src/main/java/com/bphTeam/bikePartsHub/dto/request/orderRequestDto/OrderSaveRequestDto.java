package com.bphTeam.bikePartsHub.dto.request.orderRequestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderSaveRequestDto {
    private Long userId;
    private LocalDateTime orderDate;
    private double total;
    private List<OrderDetailRequestDto> orderDetails;
}
