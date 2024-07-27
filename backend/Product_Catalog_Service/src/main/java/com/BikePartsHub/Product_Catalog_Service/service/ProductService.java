package com.BikePartsHub.Product_Catalog_Service.service;

import com.BikePartsHub.Product_Catalog_Service.dto.ProductGetResponseDTO;

import java.util.List;

public interface ProductService {
    List<ProductGetResponseDTO> getAllProducts();

    void saveProduct(ProductGetResponseDTO productGetResponseDTO);
}
