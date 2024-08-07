package com.bphTeam.bikePartsHub.mapper;

import com.bphTeam.bikePartsHub.dto.request.productAttributeDto.ProductAttributeSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.productAttributeDto.ProductAttributeUpdateRequestDto;
import com.bphTeam.bikePartsHub.entity.ProductAttribute;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductAttributeMapper {

    ProductAttributeSaveRequestDto productAttributeUpdateRequestToProductAttributeSaveResponse(ProductAttributeUpdateRequestDto dto);

    ProductAttribute productAttributeSaveDtoToProductAttributeEntity(ProductAttributeSaveRequestDto productAttributeSaveRequestDto);

    ProductAttribute productAttributeSaveRequestDtoToProductAttributeEntity(ProductAttributeSaveRequestDto productAttributeSaveRequestDto);
}
