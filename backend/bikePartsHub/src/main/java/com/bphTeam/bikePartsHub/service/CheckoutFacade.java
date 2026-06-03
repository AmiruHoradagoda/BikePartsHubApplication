package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderSaveRequestDto;

public interface CheckoutFacade {

    String placeOrder(OrderSaveRequestDto orderRequest);
}
