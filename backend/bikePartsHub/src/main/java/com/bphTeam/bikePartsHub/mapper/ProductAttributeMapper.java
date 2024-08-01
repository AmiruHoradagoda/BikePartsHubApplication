package com.bphTeam.bikePartsHub.mapper;

import com.bphTeam.bikePartsHub.dto.response.ProductAttributeResponse;
import com.bphTeam.bikePartsHub.dto.response.ProductAttributeResponseUpdate;
import com.bphTeam.bikePartsHub.entity.ProductAttribute;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductAttributeMapper {
    ProductAttribute productAttributeDtoToProductAttribute(ProductAttributeResponse productAttributeResponse);
    ProductAttributeResponse productAttributeResponseUpdateToProductAttributeResponse(ProductAttributeResponseUpdate productAttributeResponseUpdate);
}
