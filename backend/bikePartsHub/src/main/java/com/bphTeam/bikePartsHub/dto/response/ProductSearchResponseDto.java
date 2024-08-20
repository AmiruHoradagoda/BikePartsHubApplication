package com.bphTeam.bikePartsHub.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductSearchResponseDto {

    private String productName;
    private String imageUrl;
}
