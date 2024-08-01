package com.bphTeam.bikePartsHub.mapper;

import com.bphTeam.bikePartsHub.dto.response.ProductGetResponseDTO;
import com.bphTeam.bikePartsHub.entity.Product;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    List<ProductGetResponseDTO>productEntityToProductGetResponseDTO(List<Product> products);

    Product productGetResponseDTOToProduct(ProductGetResponseDTO productGetResponseDTO);

    List<ProductGetResponseDTO> productEntityToPaginatedProductGetResponseDTO(Page<Product> products);
}
