package com.bphTeam.bikePartsHub.dto.response;

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
    private String status; //delivered,processing,shipped
    private double total;
}
