package com.bphTeam.bikePartsHub.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductAttributeGetResponse {

//    private String material;
    private String color;
//    private String partNumber;
    private Set<BikeGetResponse> bikes;

}
