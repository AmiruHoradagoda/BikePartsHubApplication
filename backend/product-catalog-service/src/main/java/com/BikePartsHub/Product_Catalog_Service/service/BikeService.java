package com.BikePartsHub.Product_Catalog_Service.service;

import com.BikePartsHub.Product_Catalog_Service.dto.BikeResponse;

import java.util.List;

public interface BikeService {
    List<BikeResponse> getAllBikeDetails();

    void saveBikeDetails(BikeResponse bikeResponse);

    String deleteBikeDetails(Long bike_id);

    String updateBikeDetails(BikeResponse bikeResponse);
}
