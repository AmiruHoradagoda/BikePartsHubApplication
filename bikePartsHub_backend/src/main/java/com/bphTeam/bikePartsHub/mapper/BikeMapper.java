package com.bphTeam.bikePartsHub.mapper;

import com.bphTeam.bikePartsHub.dto.request.bikeRequestDto.BikeSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.bikeRequestDto.BikeUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.response.BikeGetResponse;
import com.bphTeam.bikePartsHub.entity.Bike;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel = "spring")
public interface BikeMapper {

    Bike bikeSaveRequestDtoToBikeEntity(BikeSaveRequestDto bikeSaveRequestDto);

    Bike bikeUpdateRequestDtoToBikeEntity(BikeUpdateRequestDto bikeUpdateRequestDto);

    List<BikeSaveRequestDto> bikeEntityToBikeSaveDtoList(List<Bike> bike);

    List<BikeGetResponse> bikeEntityToBikeGetDtoList(List<Bike> bike);

    BikeGetResponse bikeEntityToBikeGetDto(Bike bike);
}
