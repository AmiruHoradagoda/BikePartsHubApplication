package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.request.productRequestDto.ProductSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.response.ProductGetResponseDTO;
import com.bphTeam.bikePartsHub.dto.request.productRequestDto.ProductUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedResponseItemDTO;
import com.bphTeam.bikePartsHub.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.GeneralSecurityException;
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

    @GetMapping("/getProducts")
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
    @PostMapping(value = "/save",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> saveProduct(@RequestPart("product") String productJson,
                                            @RequestPart("image") MultipartFile imageFile) throws IOException, GeneralSecurityException{
        ObjectMapper objectMapper = new ObjectMapper();
        ProductSaveRequestDto productSaveRequestDto = objectMapper.readValue(productJson, ProductSaveRequestDto.class);
        productService.saveProduct(productSaveRequestDto, imageFile);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public String updateProductDetails(@RequestBody ProductUpdateRequestDto productUpdateRequestDto){
        String message = productService.updateProductService(productUpdateRequestDto);
        return message;
    }

    @DeleteMapping("/delete")
    public String deleteProductDetails(@RequestBody Long product_id ){
        String message = productService.deleteProduct(product_id);
        return  message;
    }
}
