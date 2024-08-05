package com.bphTeam.bikePartsHub.dto.request.productAttributeDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductAttributeUpdateRequestDto {
    private String material;
    private String color;
    private String partNumber;
    private Set<Long> bike_id;
}
