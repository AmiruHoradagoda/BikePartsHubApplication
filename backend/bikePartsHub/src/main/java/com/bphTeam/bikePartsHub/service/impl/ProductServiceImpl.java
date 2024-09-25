package com.bphTeam.bikePartsHub.service.impl;
import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedResponseItemDTO;
import com.bphTeam.bikePartsHub.dto.request.productAttributeDto.ProductAttributeSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.productAttributeDto.ProductAttributeUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.request.productRequestDto.ProductSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.response.BikeGetResponse;
import com.bphTeam.bikePartsHub.dto.response.ProductAttributeGetResponse;
import com.bphTeam.bikePartsHub.dto.response.ProductGetResponseDTO;
import com.bphTeam.bikePartsHub.dto.request.productRequestDto.ProductUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.response.ProductSearchResponseDto;
import com.bphTeam.bikePartsHub.entity.Bike;
import com.bphTeam.bikePartsHub.entity.Product;
import com.bphTeam.bikePartsHub.entity.ProductAttribute;
import com.bphTeam.bikePartsHub.exception.BikeNotFoundException;
import com.bphTeam.bikePartsHub.exception.ProductNotFoundException;
import com.bphTeam.bikePartsHub.mapper.ProductMapper;
import com.bphTeam.bikePartsHub.repository.BikeRepo;
import com.bphTeam.bikePartsHub.repository.ProductRepo;
import com.bphTeam.bikePartsHub.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Join;
import java.util.*;


@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductMapper productMapper;


    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private BikeRepo bikeRepo;



    @Override
    public List<ProductGetResponseDTO> getAllProducts() {
        List<Product> products = productRepo.findAll();
        List<ProductGetResponseDTO> productGetResponseDTOS = new ArrayList<>();

        for (Product product : products) {
            ProductGetResponseDTO productGetResponseDTO = new ProductGetResponseDTO();
            productGetResponseDTO.setProductId(product.getProductId());
            productGetResponseDTO.setProductName(product.getProductName());
            productGetResponseDTO.setProductType(product.getProductType());
            productGetResponseDTO.setQuantity(product.getQuantity());
            productGetResponseDTO.setCategory(product.getCategory());
            productGetResponseDTO.setManufacture(product.getManufacture());
            productGetResponseDTO.setItemDescription(product.getItemDescription());
            productGetResponseDTO.setActiveState(product.isActiveState());
            productGetResponseDTO.setAverageRating(product.getAverageRating());
            productGetResponseDTO.setPricePerUnit(product.getPricePerUnit());
            productGetResponseDTO.setDiscount(product.getDiscount());
            productGetResponseDTO.setMaterial(product.getMaterial());
            productGetResponseDTO.setPartNumber(product.getPartNumber());
            productGetResponseDTO.setImageUrl(product.getImageUrl());

            Set<ProductAttributeGetResponse> productAttributeGetResponses = new HashSet<>();
            for (ProductAttribute productAttribute : product.getProductAttributes()) {
                ProductAttributeGetResponse productAttributeGetResponse = new ProductAttributeGetResponse();
                productAttributeGetResponse.setColor(productAttribute.getColor());

                Set<BikeGetResponse> bikeGetResponses = new HashSet<>();
                Bike bike = productAttribute.getBikes();
                if (bike != null) {
                    BikeGetResponse bikeGetResponse = new BikeGetResponse();
                    bikeGetResponse.setBikeId(bike.getBikeId());
                    bikeGetResponse.setType(bike.getType());
                    bikeGetResponse.setModel(bike.getModel());
                    bikeGetResponse.setVersion(bike.getVersion());
                    bikeGetResponse.setManufacture(bike.getManufacture());
                    bikeGetResponses.add(bikeGetResponse);
                }
                productAttributeGetResponse.setBikes(bikeGetResponses);
                productAttributeGetResponses.add(productAttributeGetResponse);
            }
            productGetResponseDTO.setProductAttributes(productAttributeGetResponses);

            productGetResponseDTOS.add(productGetResponseDTO);
        }
        return productGetResponseDTOS;
    }

    public ProductGetResponseDTO getProductById(Long productId) {
        Product product = productRepo.getReferenceById(productId);

        ProductGetResponseDTO productGetResponseDTO = new ProductGetResponseDTO();
        productGetResponseDTO.setProductId(product.getProductId());
        productGetResponseDTO.setProductName(product.getProductName());
        productGetResponseDTO.setProductType(product.getProductType());
        productGetResponseDTO.setQuantity(product.getQuantity());
        productGetResponseDTO.setCategory(product.getCategory());
        productGetResponseDTO.setManufacture(product.getManufacture());
        productGetResponseDTO.setItemDescription(product.getItemDescription());
        productGetResponseDTO.setActiveState(product.isActiveState());
        productGetResponseDTO.setAverageRating(product.getAverageRating());
        productGetResponseDTO.setPricePerUnit(product.getPricePerUnit());
        productGetResponseDTO.setDiscount(product.getDiscount());
        productGetResponseDTO.setMaterial(product.getMaterial());
        productGetResponseDTO.setPartNumber(product.getPartNumber());
        productGetResponseDTO.setImageUrl(product.getImageUrl());

        Set<ProductAttributeGetResponse> productAttributeGetResponses = new HashSet<>();
        for (ProductAttribute productAttribute : product.getProductAttributes()) {
            ProductAttributeGetResponse productAttributeGetResponse = new ProductAttributeGetResponse();
            productAttributeGetResponse.setColor(productAttribute.getColor());

            Set<BikeGetResponse> bikeGetResponses = new HashSet<>();
            Bike bike = productAttribute.getBikes();
            if (bike != null) {
                BikeGetResponse bikeGetResponse = new BikeGetResponse();
                bikeGetResponse.setBikeId(bike.getBikeId());
                bikeGetResponse.setType(bike.getType());
                bikeGetResponse.setModel(bike.getModel());
                bikeGetResponse.setVersion(bike.getVersion());
                bikeGetResponse.setManufacture(bike.getManufacture());
                bikeGetResponses.add(bikeGetResponse);
            }
            productAttributeGetResponse.setBikes(bikeGetResponses);
            productAttributeGetResponses.add(productAttributeGetResponse);
        }
        productGetResponseDTO.setProductAttributes(productAttributeGetResponses);

        return productGetResponseDTO;
    }

    @Transactional
    @Override
    public void saveProduct(ProductSaveRequestDto productSaveRequestDto) {
        // Convert DTO to entity
        Product product = productMapper.productSaveRequestDtoToProductEntity(productSaveRequestDto);

        // Prepare a set to keep track of product attributes
        Set<ProductAttribute> productAttributes = new HashSet<>();

        // Loop through each ProductAttributeSaveRequestDto in the request
        for (ProductAttributeSaveRequestDto attributeDto : productSaveRequestDto.getProductAttributes()) {
            for (Long bikeId : attributeDto.getBike_id()) {
                // Retrieve the Bike entity by ID
                Bike bike = bikeRepo.findById(bikeId)
                        .orElseThrow(() -> new RuntimeException("Bike not found with ID: " + bikeId));

                // Create a new ProductAttribute entity
                ProductAttribute productAttribute = new ProductAttribute();
                productAttribute.setColor(attributeDto.getColor());
                productAttribute.setBikes(bike);
                productAttribute.setProduct(product);

                // Add to the set of product attributes
                productAttributes.add(productAttribute);
            }
        }

        // Set the product attributes to the product entity
        product.setProductAttributes(productAttributes);

        // Save the product entity (this will cascade and save the product attributes)
        productRepo.save(product);
    }

    @Override
    public List<ProductSearchResponseDto> getProductsByName(String productName, boolean activeState, int size) {
        // Ensure the page size does not exceed 10
        Pageable pageable = PageRequest.of(0, Math.min(size, 10));
        Page<ProductSearchResponseDto> page = productRepo.findProductsByNameAndActiveState(productName, activeState, pageable);
        return page.getContent();
    }

    @Transactional
    @Override
    public String updateProductService(Long productId, ProductUpdateRequestDto updateRequest) {
        // Retrieve the existing product by ID
        Product existingProduct = productRepo.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with ID: " + productId));

        // Update the product fields
        existingProduct.setProductName(updateRequest.getProductName());
        existingProduct.setProductType(updateRequest.getProductType());
        existingProduct.setQuantity(updateRequest.getQuantity());
        existingProduct.setCategory(updateRequest.getCategory());
        existingProduct.setManufacture(updateRequest.getManufacture());
        existingProduct.setItemDescription(updateRequest.getItemDescription());
        existingProduct.setActiveState(updateRequest.isActiveState());
        existingProduct.setAverageRating(updateRequest.getAverageRating());
        existingProduct.setPricePerUnit(updateRequest.getPricePerUnit());
        existingProduct.setDiscount(updateRequest.getDiscount());
        existingProduct.setMaterial(updateRequest.getMaterial());
        existingProduct.setPartNumber(updateRequest.getPartNumber());
        existingProduct.setImageUrl(updateRequest.getImageUrl());

        // Clear the existing product attributes
        existingProduct.getProductAttributes().clear();

        // Loop through each ProductAttributeUpdateRequestDto in the request
        if (updateRequest.getProductAttributes() != null) {
            for (ProductAttributeUpdateRequestDto attributeDto : updateRequest.getProductAttributes()) {
                if (attributeDto.getBike_id() != null) {
                    for (Long bikeId : attributeDto.getBike_id()) {
                        // Retrieve the Bike entity by ID
                        Bike bike = bikeRepo.findById(bikeId)
                                .orElseThrow(() -> new BikeNotFoundException("Bike not found with ID: " + bikeId));

                        // Create a new ProductAttribute entity
                        ProductAttribute productAttribute = new ProductAttribute();
                        productAttribute.setColor(attributeDto.getColor());
                        productAttribute.setBikes(bike);
                        productAttribute.setProduct(existingProduct);

                        // Add to the existing product attributes
                        existingProduct.getProductAttributes().add(productAttribute);
                    }
                }
            }
        }

        // Save the updated product entity (this will cascade and save the product attributes)
        productRepo.save(existingProduct);

        return "Product updated successfully";
    }


    @Override
    public String deleteProduct(Long product_id) {
        if (!productRepo.existsById(product_id)) {
            throw new RuntimeException("Product already removed");
        }
        productRepo.deleteById(product_id);
        return "Product delete Successfully";
    }

    @Override
    public PaginatedResponseItemDTO getProducts(String category, String productType, String productManufacture, boolean activeState, String bikeType, String bikeModel, String bikeManufacture, String color, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepo.findAll(
                (root, query, criteriaBuilder) -> {
                    List<Predicate> predicates = new ArrayList<>();
                    if (category != null) {
                        predicates.add(criteriaBuilder.equal(root.get("category"), category));
                    }
                    if (productType != null) {
                        predicates.add(criteriaBuilder.equal(root.get("productType"), productType));
                    }
                    if (productManufacture != null) {
                        predicates.add(criteriaBuilder.equal(root.get("manufacture"), productManufacture));
                    }
                    if (activeState) {
                        predicates.add(criteriaBuilder.isTrue(root.get("activeState")));
                    }
                    if (bikeType != null || bikeModel != null || bikeManufacture != null || color != null) {
                        Join<Product, ProductAttribute> productAttributeJoin = root.join("productAttributes");
                        if (bikeType != null) {
                            predicates.add(criteriaBuilder.equal(productAttributeJoin.get("bikes").get("type"), bikeType));
                        }
                        if (bikeModel != null) {
                            predicates.add(criteriaBuilder.equal(productAttributeJoin.get("bikes").get("model"), bikeModel));
                        }
                        if (bikeManufacture != null) {
                            predicates.add(criteriaBuilder.equal(productAttributeJoin.get("bikes").get("manufacture"), bikeManufacture));
                        }
                        if (color != null) {
                            predicates.add(criteriaBuilder.equal(productAttributeJoin.get("color"), color));
                        }
                    }
                    return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
                }, pageable);

        List<ProductGetResponseDTO> productGetResponseDTOS = new ArrayList<>();
        for (Product product : productPage.getContent()) {
            ProductGetResponseDTO productGetResponseDTO = new ProductGetResponseDTO();
            productGetResponseDTO.setProductId(product.getProductId());
            productGetResponseDTO.setProductName(product.getProductName());
            productGetResponseDTO.setProductType(product.getProductType());
            productGetResponseDTO.setQuantity(product.getQuantity());
            productGetResponseDTO.setCategory(product.getCategory());
            productGetResponseDTO.setManufacture(product.getManufacture());
            productGetResponseDTO.setItemDescription(product.getItemDescription());
            productGetResponseDTO.setActiveState(product.isActiveState());
            productGetResponseDTO.setAverageRating(product.getAverageRating());
            productGetResponseDTO.setPricePerUnit(product.getPricePerUnit());
            productGetResponseDTO.setDiscount(product.getDiscount());
            productGetResponseDTO.setMaterial(product.getMaterial());
            productGetResponseDTO.setPartNumber(product.getPartNumber());
            productGetResponseDTO.setImageUrl(product.getImageUrl());

            Set<ProductAttributeGetResponse> productAttributeGetResponses = new HashSet<>();
            for (ProductAttribute productAttribute : product.getProductAttributes()) {
                ProductAttributeGetResponse productAttributeGetResponse = new ProductAttributeGetResponse();
                productAttributeGetResponse.setColor(productAttribute.getColor());

                Set<BikeGetResponse> bikeGetResponses = new HashSet<>();
                Bike bike = productAttribute.getBikes();
                if (bike != null) {
                    BikeGetResponse bikeGetResponse = new BikeGetResponse();
                    bikeGetResponse.setBikeId(bike.getBikeId());
                    bikeGetResponse.setType(bike.getType());
                    bikeGetResponse.setModel(bike.getModel());
                    bikeGetResponse.setVersion(bike.getVersion());
                    bikeGetResponse.setManufacture(bike.getManufacture());
                    bikeGetResponses.add(bikeGetResponse);
                }
                productAttributeGetResponse.setBikes(bikeGetResponses);
                productAttributeGetResponses.add(productAttributeGetResponse);
            }
            productGetResponseDTO.setProductAttributes(productAttributeGetResponses);

            productGetResponseDTOS.add(productGetResponseDTO);
        }

        return new PaginatedResponseItemDTO(productGetResponseDTOS, productPage.getTotalElements());
    }


}
