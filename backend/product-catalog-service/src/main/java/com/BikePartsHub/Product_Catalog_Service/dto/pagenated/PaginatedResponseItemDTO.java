package com.BikePartsHub.Product_Catalog_Service.dto.pagenated;

import com.BikePartsHub.Product_Catalog_Service.dto.ProductGetResponseDTO;
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
