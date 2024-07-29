package com.BikePartsHub.Product_Catalog_Service.utility.mapper;

import com.BikePartsHub.Product_Catalog_Service.dto.ProductAttributeResponse;
import com.BikePartsHub.Product_Catalog_Service.dto.ProductAttributeResponseUpdate;
import com.BikePartsHub.Product_Catalog_Service.entity.ProductAttribute;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductAttributeMapper {
    ProductAttribute productAttributeDtoToProductAttribute(ProductAttributeResponse productAttributeResponse);
    ProductAttributeResponse productAttributeResponseUpdateToProductAttributeResponse(ProductAttributeResponseUpdate productAttributeResponseUpdate);
}
