package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.response.ProductGetResponseDTO;
import com.bphTeam.bikePartsHub.dto.response.ProductUpdateResponseDTO;
import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedResponseItemDTO;

import java.util.List;

public interface ProductService {
    List<ProductGetResponseDTO> getAllProducts();

    void saveProduct(ProductGetResponseDTO productGetResponseDTO);


    PaginatedResponseItemDTO getProducts(String category, String productType, String productManufacture, boolean activeState, String bikeType, String bikeModel, String bikeManufacture, String color, int page, int size);

    String updateProductService(ProductUpdateResponseDTO productUpdateResponseDTO);

    String deleteProduct(Long product_id);
}
