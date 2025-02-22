package com.bphTeam.bikePartsHub.dto.request.orderRequestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderSaveRequestDto {
    private Integer userId;
    private LocalDateTime orderDate;
    private double total;
    private List<OrderDetailRequestDto> orderDetails;
    private ShippingAddressRequestDto shippingAddress;
}
