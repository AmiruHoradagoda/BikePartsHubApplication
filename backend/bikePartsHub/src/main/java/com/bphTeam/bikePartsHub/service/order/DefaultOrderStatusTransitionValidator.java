package com.bphTeam.bikePartsHub.service.order;

import com.bphTeam.bikePartsHub.entity.enums.OrderStatus;
import com.bphTeam.bikePartsHub.exception.BadRequestException;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.EnumSet;
import java.util.Map;
import java.util.Set;

@Component
public class DefaultOrderStatusTransitionValidator implements OrderStatusTransitionValidator {

    private final Map<OrderStatus, Set<OrderStatus>> allowedTransitions = new EnumMap<>(OrderStatus.class);

    public DefaultOrderStatusTransitionValidator() {
        allowedTransitions.put(OrderStatus.PENDING, EnumSet.of(OrderStatus.PROCESSING, OrderStatus.CANCELED));
        allowedTransitions.put(OrderStatus.PROCESSING, EnumSet.of(OrderStatus.SHIPPED, OrderStatus.CANCELED));
        allowedTransitions.put(OrderStatus.SHIPPED, EnumSet.noneOf(OrderStatus.class));
        allowedTransitions.put(OrderStatus.CANCELED, EnumSet.noneOf(OrderStatus.class));
    }

    @Override
    public void validate(OrderStatus currentStatus, OrderStatus nextStatus) {
        if (nextStatus == null) {
            throw new BadRequestException("Order status is required");
        }
        if (currentStatus == null || currentStatus == nextStatus) {
            return;
        }

        Set<OrderStatus> allowedNextStatuses = allowedTransitions.getOrDefault(
                currentStatus,
                EnumSet.noneOf(OrderStatus.class)
        );
        if (!allowedNextStatuses.contains(nextStatus)) {
            throw new BadRequestException("Invalid order status transition from "
                    + currentStatus + " to " + nextStatus);
        }
    }
}
