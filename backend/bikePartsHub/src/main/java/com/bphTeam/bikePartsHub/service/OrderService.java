package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderSaveRequestDto;

public interface OrderService {
    String addOrder(OrderSaveRequestDto requestOderSaveDTO);
}
