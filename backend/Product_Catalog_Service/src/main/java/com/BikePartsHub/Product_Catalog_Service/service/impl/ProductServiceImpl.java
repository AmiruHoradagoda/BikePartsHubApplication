package com.BikePartsHub.Product_Catalog_Service.service.impl;

import com.BikePartsHub.Product_Catalog_Service.dto.BikeResponse;
import com.BikePartsHub.Product_Catalog_Service.dto.ProductAttributeResponse;
import com.BikePartsHub.Product_Catalog_Service.dto.ProductGetResponseDTO;
import com.BikePartsHub.Product_Catalog_Service.entity.Bike;
import com.BikePartsHub.Product_Catalog_Service.entity.Product;
import com.BikePartsHub.Product_Catalog_Service.entity.ProductAttribute;
import com.BikePartsHub.Product_Catalog_Service.repository.BikeRepo;
import com.BikePartsHub.Product_Catalog_Service.repository.ProductAttributeRepo;
import com.BikePartsHub.Product_Catalog_Service.repository.ProductRepo;
import com.BikePartsHub.Product_Catalog_Service.service.ProductService;
import com.BikePartsHub.Product_Catalog_Service.utility.mapper.BikeMapper;
import com.BikePartsHub.Product_Catalog_Service.utility.mapper.ProductAttributeMapper;
import com.BikePartsHub.Product_Catalog_Service.utility.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProductServiceImpl implements ProductService {


    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private ProductAttributeMapper productAttributeMapper;

    @Autowired
    private BikeMapper bikeMapper;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private BikeRepo bikeRepo;

    @Autowired
    private ProductAttributeRepo productAttributeRepo;


    @Override
    public List<ProductGetResponseDTO> getAllProducts() {
        List<Product>products = productRepo.findAll();
        List<ProductGetResponseDTO> productGetResponseDTOList = productMapper.productEntityToProductGetResponseDTO(products);

        return productGetResponseDTOList;
    }

    @Override
    public void saveProduct(ProductGetResponseDTO productGetResponseDTO) {
        Product product = productMapper.productGetResponseDTOToProduct(productGetResponseDTO);
        Set<ProductAttribute> productAttributes = new HashSet<>();
        Set<Bike> bikeList = new HashSet<>();

        for (ProductAttributeResponse productAttributeResponse : productGetResponseDTO.getProductAttributes()) {
            Set<Bike> bikes = new HashSet<>(bikeMapper.bikeDtoToBikeEntity(productAttributeResponse.getBikes()));
            bikeRepo.saveAll(bikes);
            bikeList.addAll(bikes);

            ProductAttribute productAttribute = productAttributeMapper.productAttributeDtoToProductAttribute(productAttributeResponse);
            productAttribute.setProduct(product);
            productAttribute.setBikes(bikes);
            productAttributes.add(productAttribute);
        }

        product.setProductAttributes(productAttributes);
        productRepo.save(product);
        productAttributeRepo.saveAll(productAttributes);
    }

}
