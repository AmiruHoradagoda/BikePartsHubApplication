package com.bphTeam.bikePartsHub.dto.request.productAttributeDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductAttributeSaveRequestDto {
    private String color;
    private Set<Long> bike_id;
}

