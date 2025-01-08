package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedOrderResponseWithDetailsDto;
import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderSaveRequestDto;
import com.bphTeam.bikePartsHub.utils.OrderStatus;

public interface OrderService {
    String addOrder(OrderSaveRequestDto requestOderSaveDTO);

    PaginatedOrderResponseWithDetailsDto getAllOrderDetails(OrderStatus orderStatus, int page, int size);
}
