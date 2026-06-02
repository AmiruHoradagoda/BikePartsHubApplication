package com.bphTeam.bikePartsHub.service.payment;

import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderSaveRequestDto;
import com.bphTeam.bikePartsHub.entity.Order;
import com.bphTeam.bikePartsHub.entity.Payment;
import com.bphTeam.bikePartsHub.entity.enums.PaymentMethod;

public interface PaymentStrategy {

    PaymentMethod getPaymentMethod();

    Payment createPayment(Order order, OrderSaveRequestDto orderRequest);
}
