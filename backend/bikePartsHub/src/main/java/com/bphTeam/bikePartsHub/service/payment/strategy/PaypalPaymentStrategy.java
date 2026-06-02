package com.bphTeam.bikePartsHub.service.payment.strategy;

import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.PaymentSaveRequestDto;
import com.bphTeam.bikePartsHub.entity.Order;
import com.bphTeam.bikePartsHub.entity.Payment;
import com.bphTeam.bikePartsHub.entity.enums.PaymentMethod;
import com.bphTeam.bikePartsHub.entity.enums.PaymentStatus;
import com.bphTeam.bikePartsHub.exception.BadRequestException;
import com.bphTeam.bikePartsHub.service.payment.PaymentStrategy;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class PaypalPaymentStrategy extends AbstractPaymentStrategy implements PaymentStrategy {

    @Override
    public PaymentMethod getPaymentMethod() {
        return PaymentMethod.PAYPAL;
    }

    @Override
    public Payment createPayment(Order order, OrderSaveRequestDto orderRequest) {
        PaymentSaveRequestDto paymentRequest = getPaymentRequest(orderRequest);
        String transactionReference = getProvidedTransactionReference(paymentRequest);
        if (transactionReference == null) {
            throw new BadRequestException("PayPal transaction reference is required");
        }

        return Payment.builder()
                .order(order)
                .method(PaymentMethod.PAYPAL)
                .amount(getAmount(orderRequest))
                .status(PaymentStatus.PAID)
                .transactionReference(transactionReference)
                .paidAt(paymentRequest.getPaidAt() != null ? paymentRequest.getPaidAt() : LocalDateTime.now())
                .build();
    }
}
