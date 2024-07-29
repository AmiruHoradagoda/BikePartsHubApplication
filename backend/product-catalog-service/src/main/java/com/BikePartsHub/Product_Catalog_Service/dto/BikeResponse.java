package com.BikePartsHub.Product_Catalog_Service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class BikeResponse {
    private Long  bikeId;
    private String type;
    private String model;
    private String version;
    private String manufacture;

}
