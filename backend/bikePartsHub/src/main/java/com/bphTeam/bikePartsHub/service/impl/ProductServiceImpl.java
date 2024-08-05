package com.bphTeam.bikePartsHub.service.impl;
import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedResponseItemDTO;
import com.bphTeam.bikePartsHub.dto.pagenated.ProductSpecification;
import com.bphTeam.bikePartsHub.dto.request.productAttributeDto.ProductAttributeSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.productAttributeDto.ProductAttributeUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.request.productRequestDto.ProductSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.response.ProductGetResponseDTO;
import com.bphTeam.bikePartsHub.dto.request.productRequestDto.ProductUpdateRequestDto;
import com.bphTeam.bikePartsHub.entity.Bike;
import com.bphTeam.bikePartsHub.entity.Product;
import com.bphTeam.bikePartsHub.entity.ProductAttribute;
import com.bphTeam.bikePartsHub.mapper.BikeMapper;
import com.bphTeam.bikePartsHub.mapper.ProductAttributeMapper;
import com.bphTeam.bikePartsHub.mapper.ProductMapper;
import com.bphTeam.bikePartsHub.repository.BikeRepo;
import com.bphTeam.bikePartsHub.repository.ProductAttributeRepo;
import com.bphTeam.bikePartsHub.repository.ProductRepo;
import com.bphTeam.bikePartsHub.service.GoogleDriveService;
import com.bphTeam.bikePartsHub.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;

import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;
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

    @Autowired
    private GoogleDriveService googleDriveService;

    @Override
    public List<ProductGetResponseDTO> getAllProducts() {
        List<Product> products = productRepo.findAll();
        return productMapper.productEntityToProductGetResponseDTO(products);
    }

    @Transactional
    @Override
    public void saveProduct(ProductSaveRequestDto productSaveRequestDto, MultipartFile imageFile) throws IOException, GeneralSecurityException {
        Product product = productMapper.productGetResponseDtOToProductEntity(productSaveRequestDto);
        Set<ProductAttribute> productAttributes = new HashSet<>();

        if (productRepo.existsById(productSaveRequestDto.getProductId())) {
            throw new RuntimeException("Duplicate Error");
        }

        for (ProductAttributeSaveRequestDto productAttributeSaveRequestDto : productSaveRequestDto.getProductAttributes()) {
            Set<Bike> bikes = new HashSet<>();

            for (Bike bike : bikeMapper.bikeSaveDtoListToBikeEntityList(productAttributeSaveRequestDto.getBikes())) {
                if (!bikeRepo.existsById(bike.getBikeId())) {
                    bikeRepo.save(bike);
                }
                bikes.add(bike);
            }

            ProductAttribute productAttribute = productAttributeMapper. productAttributeSaveRequestDtoToProductAttributeEntity(productAttributeSaveRequestDto);
            productAttribute.setProduct(product);
            productAttribute.setBikes(bikes);
            productAttributes.add(productAttribute);
        }

        product.setProductAttributes(productAttributes);

        // Upload image to Google Drive
        File tempFile = File.createTempFile("temp", null);
        imageFile.transferTo(tempFile);
        String imageUrl = googleDriveService.uploadImageToDrive(tempFile);
        tempFile.delete();

        // Save product and image URL
        product.setImageUrl(imageUrl);
        productRepo.save(product);
        productAttributeRepo.saveAll(productAttributes);
    }


    @Override
    public PaginatedResponseItemDTO getProducts(String category, String productType, String productManufacture, boolean activeState, String bikeType, String bikeModel, String bikeManufacture, String color, int page, int size) {
        Page<Product> products = productRepo.findAll(ProductSpecification.getProducts(activeState, category, productType, productManufacture, bikeType, bikeModel, bikeManufacture, color), PageRequest.of(page, size));
        int count = productRepo.countAllByActiveStateEquals(activeState);

        if (products.getSize() < 1) {
            throw new NotFoundException("No Data");
        } else {
            PaginatedResponseItemDTO paginatedResponseItemDTO = new PaginatedResponseItemDTO(
                    productMapper.productEntityToPaginatedProductGetResponseDTO(products),
                    count
            );

            return paginatedResponseItemDTO;
        }
    }

    @Transactional
    @Override
    public String updateProductService(ProductUpdateRequestDto productUpdateRequestDto) {
        if (!productRepo.existsById(productUpdateRequestDto.getProductId())) {
            throw new RuntimeException("No data found for that ID");
        }

        Product product = productRepo.getReferenceById(productUpdateRequestDto.getProductId());

        product.setProductName(productUpdateRequestDto.getProductName());
        product.setQuantity(productUpdateRequestDto.getQuantity());
        product.setCategory(productUpdateRequestDto.getCategory());
        product.setManufacture(productUpdateRequestDto.getManufacture());
        product.setItemDescription(productUpdateRequestDto.getItemDescription());
        product.setActiveState(productUpdateRequestDto.isActiveState());
        product.setAverageRating(productUpdateRequestDto.getAverageRating());
        product.setPricePerUnit(productUpdateRequestDto.getPricePerUnit());
        product.setDiscount(productUpdateRequestDto.getDiscount());

        updateProductAttributes(product, productUpdateRequestDto.getProductAttributes());

        productRepo.save(product);
        return "Product Update Successfully";
    }

    private void updateProductAttributes(Product product, Set<ProductAttributeUpdateRequestDto> productAttributeResponseUpdates) {
        product.getProductAttributes().clear();

        for (ProductAttributeUpdateRequestDto dto : productAttributeResponseUpdates) {
            Set<Bike> bikes = new HashSet<>();

            for (Long bikeId : dto.getBike_id()) {
                if (!bikeRepo.existsById(bikeId)) {
                    throw new RuntimeException("No Such a Bike");
                }
                bikes.add(bikeRepo.getReferenceById(bikeId));
            }

            ProductAttributeSaveRequestDto productAttributeSaveRequestDto = productAttributeMapper.productAttributeUpdateRequestToProductAttributeSaveResponse(dto);
            productAttributeSaveRequestDto.setBikes(bikeMapper.BikeEntityListToBikeSaveDtoList(bikes));
            ProductAttribute attribute = productAttributeMapper.productAttributeSaveDtoToProductAttributeEntity(productAttributeSaveRequestDto);
            attribute.setProduct(product);
            attribute.setBikes(bikes);
            product.getProductAttributes().add(attribute);
        }
    }

    @Override
    public String deleteProduct(Long product_id) {
        if (!productRepo.existsById(product_id)) {
            throw new RuntimeException("Product already removed");
        }
        productRepo.deleteById(product_id);
        return "Product delete Successfully";
    }
}
