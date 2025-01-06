package com.bphTeam.bikePartsHub.mapper;

import com.bphTeam.bikePartsHub.dto.response.OrderResponseDto;
import com.bphTeam.bikePartsHub.entity.Order;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Set<OrderResponseDto> toOrder(Set<Order> order);
}
