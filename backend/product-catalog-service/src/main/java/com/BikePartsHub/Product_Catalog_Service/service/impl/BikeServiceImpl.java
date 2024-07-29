package com.BikePartsHub.Product_Catalog_Service.service.impl;

import com.BikePartsHub.Product_Catalog_Service.dto.BikeResponse;
import com.BikePartsHub.Product_Catalog_Service.entity.Bike;
import com.BikePartsHub.Product_Catalog_Service.repository.BikeRepo;
import com.BikePartsHub.Product_Catalog_Service.service.BikeService;
import com.BikePartsHub.Product_Catalog_Service.utility.mapper.BikeMapper;
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
    public List<BikeResponse> getAllBikeDetails() {
        List<Bike> bike = bikeRepo.findAll();
        List<BikeResponse> bikeResponse = bikeMapper.bikeEntityToBikeDto(bike);

        return bikeResponse;
    }

    @Override
    public void saveBikeDetails(BikeResponse bikeResponse) {
        Bike bike = bikeMapper.bikeDtoToBikeEntity(bikeResponse);
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
    public String updateBikeDetails(BikeResponse bikeResponse) {
        if(!bikeRepo.existsById(bikeResponse.getBikeId())){
            throw new RuntimeException("There no such a bike");
        }
        bikeRepo.save(bikeMapper.bikeDtoToBikeEntity(bikeResponse));
        return "Bike details successfully updated";
    }


}
