package com.bphTeam.bikePartsHub.repository;

import com.bphTeam.bikePartsHub.entity.Bike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeRepo extends JpaRepository<Bike,Long> {
}
