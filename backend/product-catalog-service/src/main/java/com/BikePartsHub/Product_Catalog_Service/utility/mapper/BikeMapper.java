package com.BikePartsHub.Product_Catalog_Service.utility.mapper;

import com.BikePartsHub.Product_Catalog_Service.dto.BikeResponse;
import com.BikePartsHub.Product_Catalog_Service.entity.Bike;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface BikeMapper {

    Set<Bike> bikeDtoListToBikeEntity(Set<BikeResponse> bikeResponse);
    Set<BikeResponse> BikeEntityListToBikeDtoList(Set<Bike> bikeResponse);
    List<BikeResponse> bikeEntityToBikeDto(List<Bike> bike);

    Bike bikeDtoToBikeEntity(BikeResponse bikeResponse);
}
