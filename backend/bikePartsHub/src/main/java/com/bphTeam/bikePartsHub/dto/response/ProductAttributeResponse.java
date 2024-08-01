package com.bphTeam.bikePartsHub.dto.response;

import com.bphTeam.bikePartsHub.dto.response.BikeResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductAttributeResponse {

    private String material;
    private String color;
    private String partNumber;
    private Set<BikeResponse> bikes;

}
