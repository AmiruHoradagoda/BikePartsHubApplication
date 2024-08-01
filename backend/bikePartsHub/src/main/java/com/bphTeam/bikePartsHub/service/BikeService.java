package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.response.BikeResponse;

import java.util.List;

public interface BikeService {
    List<BikeResponse> getAllBikeDetails();

    void saveBikeDetails(BikeResponse bikeResponse);

    String deleteBikeDetails(Long bike_id);

    String updateBikeDetails(BikeResponse bikeResponse);
}
