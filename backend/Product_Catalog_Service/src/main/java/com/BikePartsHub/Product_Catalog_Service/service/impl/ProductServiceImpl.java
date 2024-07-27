package com.BikePartsHub.Product_Catalog_Service.service.impl;

import com.BikePartsHub.Product_Catalog_Service.dto.BikeResponse;
import com.BikePartsHub.Product_Catalog_Service.dto.ProductAttributeResponse;
import com.BikePartsHub.Product_Catalog_Service.dto.ProductGetResponseDTO;
import com.BikePartsHub.Product_Catalog_Service.dto.pagenated.PaginatedResponseItemDTO;
import com.BikePartsHub.Product_Catalog_Service.dto.pagenated.ProductSpecification;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

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

        for (ProductAttributeResponse productAttributeResponse : productGetResponseDTO.getProductAttributes()) {
            Set<Bike> bikes = new HashSet<>();

            for (Bike bike : bikeMapper.bikeDtoListToBikeEntity(productAttributeResponse.getBikes())) {
                if (!bikeRepo.existsById(bike.getBikeId())) {
                    bikeRepo.save(bike);
                }
                bikes.add(bike);
            }

            ProductAttribute productAttribute = productAttributeMapper.productAttributeDtoToProductAttribute(productAttributeResponse);
            productAttribute.setProduct(product);
            productAttribute.setBikes(bikes);
            productAttributes.add(productAttribute);
        }

        product.setProductAttributes(productAttributes);
        productRepo.save(product);
        productAttributeRepo.saveAll(productAttributes);
    }



    @Override
    public PaginatedResponseItemDTO getProducts(String category, String productType, String productManufacture, boolean activeState, String bikeType, String bikeModel, String bikeManufacture, String color, int page, int size) {
      Page<Product>products =  productRepo.findAll(ProductSpecification.getProducts(activeState,category, productType, productManufacture,bikeType, bikeModel, bikeManufacture, color), PageRequest.of(page,size));
      int count = productRepo.countAllByActiveStateEquals(activeState);

        if(products.getSize()<1){
            throw new NotFoundException("No Data");
        }
        else{
            PaginatedResponseItemDTO paginatedResponseItemDTO = new PaginatedResponseItemDTO(
                    productMapper.productEntityToPaginatedProductGetResponseDTO(products),
                    count
            );

            return paginatedResponseItemDTO;
        }
    }


}
