package com.BikePartsHub.Product_Catalog_Service.repository;

import com.BikePartsHub.Product_Catalog_Service.entity.ProductAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductAttributeRepo extends JpaRepository<ProductAttribute,Long> {
}
