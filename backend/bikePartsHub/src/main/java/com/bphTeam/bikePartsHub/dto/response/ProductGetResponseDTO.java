package com.bphTeam.bikePartsHub.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductGetResponseDTO {

    private long productId;

    private String productName;

    private  String productType;

    private int quantity;

    private String category;

    private String manufacture;

    private String itemDescription;

    private boolean activeState;

    private float averageRating;

    private float pricePerUnit;

    private float discount;

    private String material;

    private String partNumber;

    private String imageUrl;

    private Set<ProductAttributeGetResponse> productAttributes;


}
