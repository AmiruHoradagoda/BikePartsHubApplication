package com.bphTeam.bikePartsHub.dto.pagenated;

import com.bphTeam.bikePartsHub.dto.response.productResponseDto.ProductGetResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaginatedResponseItemDTO {
    List<ProductGetResponseDTO> productDetailsList;
    private long dataCount;


}
