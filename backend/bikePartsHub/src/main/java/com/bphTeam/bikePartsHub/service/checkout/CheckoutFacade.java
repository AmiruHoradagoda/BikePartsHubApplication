package com.bphTeam.bikePartsHub.service.checkout;

import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderSaveRequestDto;

public interface CheckoutFacade {

    String placeOrder(OrderSaveRequestDto orderRequest);
}
