package com.BikePartsHub.Product_Catalog_Service.utility.mapper;

import com.BikePartsHub.Product_Catalog_Service.dto.ProductGetResponseDTO;
import com.BikePartsHub.Product_Catalog_Service.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    List<ProductGetResponseDTO>productEntityToProductGetResponseDTO(List<Product> products);

    Product productGetResponseDTOToProduct(ProductGetResponseDTO productGetResponseDTO);
}
