package com.bphTeam.bikePartsHub.dto.response.orderResponseDto;

import com.bphTeam.bikePartsHub.dto.response.ShippingAddressDto;
import com.bphTeam.bikePartsHub.utils.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderResponseWithDetailsDto {
    private long orderId;
    private String firstName;
    private String lastName;
    private String email;
    private ShippingAddressDto shippingAddress;
    private LocalDateTime date;
    private OrderStatus status; //delivered,processing,shipped
    private double total;
    private Set<OrderDetailsDto> orderDetails;
}

