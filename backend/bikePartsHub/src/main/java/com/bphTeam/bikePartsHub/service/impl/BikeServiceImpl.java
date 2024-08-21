package com.bphTeam.bikePartsHub.service.impl;

import com.bphTeam.bikePartsHub.dto.request.bikeRequestDto.BikeSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.bikeRequestDto.BikeUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.response.BikeGetResponse;
import com.bphTeam.bikePartsHub.entity.Bike;
import com.bphTeam.bikePartsHub.mapper.BikeMapper;
import com.bphTeam.bikePartsHub.repository.BikeRepo;
import com.bphTeam.bikePartsHub.service.BikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BikeServiceImpl implements BikeService {
    @Autowired
    private BikeRepo bikeRepo;
    @Autowired
    private BikeMapper bikeMapper;

    @Override
    public List<BikeGetResponse> getAllBikeDetails() {
        List<Bike> bike = bikeRepo.findAll();
        List<BikeGetResponse> bikeResponse = bikeMapper.bikeEntityToBikeGetDtoList(bike);

        return bikeResponse;
    }

    @Override
    public void saveBikeDetails(BikeSaveRequestDto bikeSaveRequestDto) {
        Bike bike = bikeMapper.bikeSaveRequestDtoToBikeEntity(bikeSaveRequestDto);
        bikeRepo.save(bike);
    }

    @Override
    public String deleteBikeDetails(Long bike_id) {
        if(!bikeRepo.existsById(bike_id)){
            throw new RuntimeException("Bike is already deleted");
        }
        bikeRepo.deleteById(bike_id);
        return "Bike details successfully deleted";
    }

    @Override
    public String updateBikeDetails(Long id,BikeUpdateRequestDto bikeUpdateRequestDto) {
        if(!bikeRepo.existsById(id)){
            throw new RuntimeException("There no such a bike");
        }
        bikeRepo.save(bikeMapper.bikeUpdateRequestDtoToBikeEntity(bikeUpdateRequestDto));
        return "Bike details successfully updated";
    }

    @Override
    public Long getBikeId(String type, String model, String version, String manufacture) {
        Bike bike = bikeRepo.findByTypeAndModelAndVersionAndManufacture(type, model, version, manufacture);
        return bike != null ? bike.getBikeId() : null;
    }

    @Override
    public BikeGetResponse getBikeById(Long bikeId) {
        Bike bike   = bikeRepo.getReferenceById(bikeId);
        BikeGetResponse bikeGetResponse = bikeMapper.bikeEntityToBikeGetDto(bike);
        return bikeGetResponse;
    }


}
