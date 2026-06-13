package com.bphTeam.bikePartsHub.service.order;

import com.bphTeam.bikePartsHub.entity.enums.OrderStatus;

public interface OrderStatusTransitionValidator {

    void validate(OrderStatus currentStatus, OrderStatus nextStatus);
}
