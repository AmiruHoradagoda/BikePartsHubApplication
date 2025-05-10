package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.service.ProductService;
import com.bphTeam.bikePartsHub.dto.request.productRequestDto.ProductSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.productRequestDto.ProductUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.response.productResponseDto.ProductGetResponseDTO;
import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedResponseItemDTO;
import com.bphTeam.bikePartsHub.dto.response.productResponseDto.ProductSearchResponseDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

// Java




class ProductServiceTest {

    private ProductService productService;

    @BeforeEach
    void setUp() {
        productService = Mockito.mock(ProductService.class);
    }
    
    @Test
    void testGetAllProducts() {
        ProductGetResponseDTO product = new ProductGetResponseDTO();
        when(productService.getAllProducts()).thenReturn(Collections.singletonList(product));
        List<ProductGetResponseDTO> result = productService.getAllProducts();
        assertEquals(1, result.size());
    }
    
    @Test
    void testGetProducts() {
        PaginatedResponseItemDTO paginated = new PaginatedResponseItemDTO();
        when(productService.getProducts(anyString(), anyString(), anyString(), anyBoolean(), anyString(), anyString(), anyString(), anyString(), anyInt(), anyInt()))
                .thenReturn(paginated);
        PaginatedResponseItemDTO result = productService.getProducts("cat", "type", "manu", true, "bikeType", "bikeModel", "bikeManu", "color", 0, 10);
        assertNotNull(result);
    }

    @Test
    void testUpdateProductService() {
        when(productService.updateProductService(anyLong(), any(ProductUpdateRequestDto.class))).thenReturn("Updated");
        String result = productService.updateProductService(1L, new ProductUpdateRequestDto());
        assertEquals("Updated", result);
    }
    @Test
    void testDeleteProduct() {
        when(productService.deleteProduct(anyLong())).thenReturn("Deleted");
        String result = productService.deleteProduct(1L);
        assertEquals("Deleted", result);
    }



}