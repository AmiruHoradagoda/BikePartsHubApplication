package com.bphTeam.bikePartsHub.service.payment;

import com.bphTeam.bikePartsHub.entity.enums.PaymentMethod;
import com.bphTeam.bikePartsHub.exception.BadRequestException;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Component
public class PaymentStrategyFactory {

    private final Map<PaymentMethod, PaymentStrategy> strategies = new EnumMap<>(PaymentMethod.class);

    public PaymentStrategyFactory(List<PaymentStrategy> paymentStrategies) {
        paymentStrategies.forEach(strategy -> strategies.put(strategy.getPaymentMethod(), strategy));
    }

    public PaymentStrategy getStrategy(PaymentMethod paymentMethod) {
        PaymentStrategy strategy = strategies.get(paymentMethod);
        if (strategy == null) {
            throw new BadRequestException("Unsupported payment method: " + paymentMethod);
        }
        return strategy;
    }
}
