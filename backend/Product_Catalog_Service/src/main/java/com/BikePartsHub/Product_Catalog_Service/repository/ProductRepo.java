package com.BikePartsHub.Product_Catalog_Service.repository;

import com.BikePartsHub.Product_Catalog_Service.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product,Long> {
}
