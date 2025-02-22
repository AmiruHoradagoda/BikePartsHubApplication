package com.bphTeam.bikePartsHub.repository;

import com.bphTeam.bikePartsHub.entity.Bike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeRepo extends JpaRepository<Bike,Long> {
    boolean existsByTypeAndModelAndManufactureAndVersion(String type, String model, String manufacture, String version);
    Bike findByTypeAndModelAndVersionAndManufacture(String type, String model, String version, String manufacture);
}
