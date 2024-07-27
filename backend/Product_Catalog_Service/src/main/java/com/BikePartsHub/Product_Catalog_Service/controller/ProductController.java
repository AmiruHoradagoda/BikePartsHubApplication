package com.BikePartsHub.Product_Catalog_Service.controller;

import com.BikePartsHub.Product_Catalog_Service.dto.ProductGetResponseDTO;
import com.BikePartsHub.Product_Catalog_Service.dto.pagenated.PaginatedResponseItemDTO;
import com.BikePartsHub.Product_Catalog_Service.entity.Product;
import com.BikePartsHub.Product_Catalog_Service.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/product")
@CrossOrigin
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/getAllProducts")
    private ResponseEntity<List<ProductGetResponseDTO>> getAllProducts(){
        List<ProductGetResponseDTO> productGetResponseDTO = productService.getAllProducts();
        return ResponseEntity.ok(productGetResponseDTO);
    }

    @GetMapping("/products")
    public PaginatedResponseItemDTO getProductWithPaginated(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String productType,
            @RequestParam(required = false) String productManufacture,
            @RequestParam(required = false) boolean activeState,
            @RequestParam(required = false) String bikeType,
            @RequestParam(required = false) String bikeModel,
            @RequestParam(required = false) String bikeManufacture,
            @RequestParam(required = false) String color,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return productService.getProducts(category, productType, productManufacture, activeState, bikeType, bikeModel, bikeManufacture, color, page,size);
    }
    @PostMapping("/save")
    private ResponseEntity<Void> saveProduct(@RequestBody ProductGetResponseDTO productGetResponseDTO ){
        productService.saveProduct(productGetResponseDTO);
        return ResponseEntity.ok().build();
    }
}
