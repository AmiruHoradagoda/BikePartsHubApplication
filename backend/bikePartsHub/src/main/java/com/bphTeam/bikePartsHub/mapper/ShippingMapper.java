package com.bphTeam.bikePartsHub.mapper;

import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.ShippingAddressRequestDto;
import com.bphTeam.bikePartsHub.entity.ShippingAddress;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ShippingMapper {
    ShippingAddress toShippingEntity(ShippingAddressRequestDto requestShippingAddressSave);
}
