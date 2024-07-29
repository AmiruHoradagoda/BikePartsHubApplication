package com.BikePartsHub.Product_Catalog_Service.service;

import com.BikePartsHub.Product_Catalog_Service.dto.ProductGetResponseDTO;
import com.BikePartsHub.Product_Catalog_Service.dto.ProductUpdateResponseDTO;
import com.BikePartsHub.Product_Catalog_Service.dto.pagenated.PaginatedResponseItemDTO;

import java.util.List;

public interface ProductService {
    List<ProductGetResponseDTO> getAllProducts();

    void saveProduct(ProductGetResponseDTO productGetResponseDTO);


    PaginatedResponseItemDTO getProducts(String category, String productType, String productManufacture, boolean activeState, String bikeType, String bikeModel, String bikeManufacture, String color, int page, int size);

    String updateProductService(ProductUpdateResponseDTO productUpdateResponseDTO);

    String deleteProduct(Long product_id);
}
