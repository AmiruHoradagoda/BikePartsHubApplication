package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.request.bikeRequestDto.BikeSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.bikeRequestDto.BikeUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.response.BikeGetResponse;

import java.util.List;

public interface BikeService {
    List<BikeGetResponse> getAllBikeDetails();

    void saveBikeDetails(BikeSaveRequestDto bikeSaveRequestDto);

    String deleteBikeDetails(Long bike_id);

    String updateBikeDetails(Long id,BikeUpdateRequestDto bikeUpdateRequestDto);

    Long getBikeId(String type, String model, String version, String manufacture);

    BikeGetResponse getBikeById(Long bikeId);
}
