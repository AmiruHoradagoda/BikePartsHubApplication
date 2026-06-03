package com.bphTeam.bikePartsHub.service.order;

import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedOrderResponseWithDetailsDto;
import com.bphTeam.bikePartsHub.dto.response.orderResponseDto.OrderResponseWithDetailsDto;
import com.bphTeam.bikePartsHub.entity.enums.OrderStatus;

import java.util.List;

public interface OrderService {
    PaginatedOrderResponseWithDetailsDto getAllOrderDetails(OrderStatus orderStatus, int page, int size);

    String changeOrderStatus(long orderId, OrderStatus status);

    PaginatedOrderResponseWithDetailsDto getCustomerOrders(Integer id, int page, int size);

    OrderResponseWithDetailsDto getOrderById(Long id);

    List<OrderResponseWithDetailsDto> getMonthlyOrderReport(int year, int month);
}
