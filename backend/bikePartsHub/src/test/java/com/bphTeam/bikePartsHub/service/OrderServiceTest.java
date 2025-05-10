package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedOrderResponseWithDetailsDto;
import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.response.orderResponseDto.OrderResponseWithDetailsDto;
import com.bphTeam.bikePartsHub.utils.OrderStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;


class OrderServiceTest {

    private OrderService orderService;

    @BeforeEach
    void setUp() {
        orderService = Mockito.mock(OrderService.class);
    }

    @Test
    void testAddOrder() {
        OrderSaveRequestDto dto = new OrderSaveRequestDto();
        when(orderService.addOrder(any(OrderSaveRequestDto.class))).thenReturn("Order added");
        String result = orderService.addOrder(dto);
        assertEquals("Order added", result);
    }

      @Test
    void testGetAllOrderDetails() {
        PaginatedOrderResponseWithDetailsDto paginatedDto = new PaginatedOrderResponseWithDetailsDto();
        when(orderService.getAllOrderDetails(any(OrderStatus.class), anyInt(), anyInt())).thenReturn(paginatedDto);
        PaginatedOrderResponseWithDetailsDto result = orderService.getAllOrderDetails(OrderStatus.PENDING, 0, 10);
        assertNotNull(result);
    }

    
}