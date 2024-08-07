package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.request.productRequestDto.ProductSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.response.ProductGetResponseDTO;
import com.bphTeam.bikePartsHub.dto.request.productRequestDto.ProductUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedResponseItemDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

public interface ProductService {
    List<ProductGetResponseDTO> getAllProducts();

    PaginatedResponseItemDTO getProducts(String category, String productType, String productManufacture, boolean activeState, String bikeType, String bikeModel, String bikeManufacture, String color, int page, int size);

    String updateProductService(ProductUpdateRequestDto productUpdateRequestDto);

    String deleteProduct(Long product_id);

    void saveProduct(ProductSaveRequestDto productSaveRequestDto) ;
}
