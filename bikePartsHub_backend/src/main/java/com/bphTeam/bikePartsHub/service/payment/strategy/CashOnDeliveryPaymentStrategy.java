package com.bphTeam.bikePartsHub.service.payment.strategy;

import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.PaymentSaveRequestDto;
import com.bphTeam.bikePartsHub.entity.Order;
import com.bphTeam.bikePartsHub.entity.Payment;
import com.bphTeam.bikePartsHub.entity.enums.PaymentMethod;
import com.bphTeam.bikePartsHub.entity.enums.PaymentStatus;
import com.bphTeam.bikePartsHub.service.payment.strategy.PaymentStrategy;
import org.springframework.stereotype.Component;

@Component
public class CashOnDeliveryPaymentStrategy extends AbstractPaymentStrategy implements PaymentStrategy {

    private static final String TRANSACTION_PREFIX = "COD";

    @Override
    public PaymentMethod getPaymentMethod() {
        return PaymentMethod.CASH_ON_DELIVERY;
    }

    @Override
    public Payment createPayment(Order order, OrderSaveRequestDto orderRequest) {
        PaymentSaveRequestDto paymentRequest = getPaymentRequest(orderRequest);
        String transactionReference = getProvidedTransactionReference(paymentRequest);

        return Payment.builder()
                .order(order)
                .method(PaymentMethod.CASH_ON_DELIVERY)
                .amount(getAmount(orderRequest))
                .status(PaymentStatus.PENDING)
                .transactionReference(transactionReference != null
                        ? transactionReference
                        : generateTransactionReference(TRANSACTION_PREFIX))
                .paidAt(null)
                .build();
    }
}
