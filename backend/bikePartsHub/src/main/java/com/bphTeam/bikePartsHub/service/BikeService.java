package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.request.bikeRequestDto.BikeSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.bikeRequestDto.BikeUpdateRequestDto;

import java.util.List;

public interface BikeService {
    List<BikeSaveRequestDto> getAllBikeDetails();

    void saveBikeDetails(BikeSaveRequestDto bikeSaveRequestDto);

    String deleteBikeDetails(Long bike_id);

    String updateBikeDetails(Long id,BikeUpdateRequestDto bikeUpdateRequestDto);
}
