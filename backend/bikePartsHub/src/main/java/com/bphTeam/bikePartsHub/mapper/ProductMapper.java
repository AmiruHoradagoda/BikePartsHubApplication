package com.bphTeam.bikePartsHub.mapper;

import com.bphTeam.bikePartsHub.dto.request.productRequestDto.ProductSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.response.ProductGetResponseDTO;
import com.bphTeam.bikePartsHub.entity.Product;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    List<ProductGetResponseDTO>productEntityToProductGetResponseDTO(List<Product> products);

    List<ProductGetResponseDTO> productEntityToPaginatedProductGetResponseDTO(Page<Product> products);

    Product productGetResponseDtOToProductEntity(ProductSaveRequestDto productSaveRequestDto);
}
