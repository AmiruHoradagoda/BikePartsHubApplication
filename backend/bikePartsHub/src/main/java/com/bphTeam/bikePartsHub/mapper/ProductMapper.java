package com.bphTeam.bikePartsHub.mapper;

import com.bphTeam.bikePartsHub.dto.request.productRequestDto.ProductSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.response.ProductGetResponseDTO;
import com.bphTeam.bikePartsHub.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product productSaveRequestDtoToProductEntity(ProductSaveRequestDto productSaveRequestDto);
//    ProductGetResponseDTO productEntityToProductGetResponseDTO(Product product);

}
