package com.bphTeam.bikePartsHub.mapper;

import com.bphTeam.bikePartsHub.dto.response.BikeResponse;
import com.bphTeam.bikePartsHub.entity.Bike;
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
