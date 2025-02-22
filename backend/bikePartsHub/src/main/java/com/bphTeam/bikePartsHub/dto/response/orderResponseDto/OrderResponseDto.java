package com.bphTeam.bikePartsHub.dto.response.orderResponseDto;

import com.bphTeam.bikePartsHub.utils.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponseDto {
    private long orderId;
    private LocalDateTime date;
    private OrderStatus status; //delivered,processing,shipped
    private double total;
}
