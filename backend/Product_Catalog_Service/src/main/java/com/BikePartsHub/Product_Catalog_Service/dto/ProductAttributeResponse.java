package com.BikePartsHub.Product_Catalog_Service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
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
