package com.BikePartsHub.Product_Catalog_Service.controller;

import com.BikePartsHub.Product_Catalog_Service.dto.ProductGetResponseDTO;
import com.BikePartsHub.Product_Catalog_Service.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(name = "api/v1/product")
@CrossOrigin
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/getAllProducts")
    private ResponseEntity<List<ProductGetResponseDTO>> getAllProducts(){
        List<ProductGetResponseDTO> productGetResponseDTO = productService.getAllProducts();
        return ResponseEntity.ok(productGetResponseDTO);
    }

    @PostMapping("/save")
    private ResponseEntity<String> saveProduct(@RequestBody ProductGetResponseDTO productGetResponseDTO ){
        productService.saveProduct(productGetResponseDTO);
        return ResponseEntity.ok("Product Saved Successfully");
    }
}
