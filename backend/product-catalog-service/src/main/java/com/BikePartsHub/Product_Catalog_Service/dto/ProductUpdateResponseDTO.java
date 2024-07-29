package com.BikePartsHub.Product_Catalog_Service.dto;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductUpdateResponseDTO {

    private long productId;

    private String productName;

    private  String productType;

    private String quantity;

    private String category;

    private String manufacture;

    private String itemDescription;
    @Column(name="active_state",columnDefinition = "TINYINT default 0")
    private boolean activeState;

    private float averageRating;

    private float pricePerUnit;

    private float discount;

    private Set<ProductAttributeResponseUpdate> productAttributes;

}
