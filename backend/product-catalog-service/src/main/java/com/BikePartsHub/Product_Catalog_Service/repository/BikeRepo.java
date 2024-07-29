package com.BikePartsHub.Product_Catalog_Service.repository;

import com.BikePartsHub.Product_Catalog_Service.entity.Bike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeRepo extends JpaRepository<Bike,Long> {
}
