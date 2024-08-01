package com.bphTeam.bikePartsHub.repository;


import com.bphTeam.bikePartsHub.entity.ProductAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductAttributeRepo extends JpaRepository<ProductAttribute,Long> {
}
