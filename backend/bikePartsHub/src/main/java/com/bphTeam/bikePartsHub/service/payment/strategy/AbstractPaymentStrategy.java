package com.bphTeam.bikePartsHub.service.payment.strategy;

import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.PaymentSaveRequestDto;

import java.math.BigDecimal;
import java.util.UUID;

public abstract class AbstractPaymentStrategy {

    protected PaymentSaveRequestDto getPaymentRequest(OrderSaveRequestDto orderRequest) {
        return orderRequest.getPayment();
    }

    protected BigDecimal getAmount(OrderSaveRequestDto orderRequest) {
        return BigDecimal.valueOf(orderRequest.getTotal());
    }

    protected String getProvidedTransactionReference(PaymentSaveRequestDto paymentRequest) {
        if (paymentRequest == null || isBlank(paymentRequest.getTransactionReference())) {
            return null;
        }
        return paymentRequest.getTransactionReference();
    }

    protected String generateTransactionReference(String prefix) {
        return prefix + "-" + UUID.randomUUID();
    }

    protected boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
