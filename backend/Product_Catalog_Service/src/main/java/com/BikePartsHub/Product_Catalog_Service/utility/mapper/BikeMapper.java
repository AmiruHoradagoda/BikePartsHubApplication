package com.BikePartsHub.Product_Catalog_Service.utility.mapper;

import com.BikePartsHub.Product_Catalog_Service.dto.BikeResponse;
import com.BikePartsHub.Product_Catalog_Service.entity.Bike;
import com.BikePartsHub.Product_Catalog_Service.repository.BikeRepo;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface BikeMapper {

    Set<Bike> bikeDtoListToBikeEntity(Set<BikeResponse> bikeResponse);

    List<BikeResponse> bikeEntityToBikeDto(List<Bike> bike);

    Bike bikeDtoToBikeEntity(BikeResponse bikeResponse);
}
