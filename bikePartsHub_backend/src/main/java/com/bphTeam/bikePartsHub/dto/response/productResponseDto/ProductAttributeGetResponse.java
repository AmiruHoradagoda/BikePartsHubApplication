package com.bphTeam.bikePartsHub.dto.response.productResponseDto;

import com.bphTeam.bikePartsHub.dto.response.BikeGetResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductAttributeGetResponse {

    private String color;
    private Set<BikeGetResponse> bikes;

}
