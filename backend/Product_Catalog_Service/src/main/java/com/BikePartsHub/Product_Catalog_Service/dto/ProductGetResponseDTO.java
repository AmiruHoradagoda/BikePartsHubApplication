package com.BikePartsHub.Product_Catalog_Service.dto;

import com.BikePartsHub.Product_Catalog_Service.entity.Bike;
import com.BikePartsHub.Product_Catalog_Service.entity.ProductAttribute;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductGetResponseDTO {

    private String productName;

    private  String productType;

    private String quantity;

    private String category;

    private String manufacture;

    private String itemDescription;
    @Column(name="active_state",columnDefinition = "TINYINT default 0")
    private boolean activeState;

    private String MeasuringUnitType;

    private float averageRating;

    private float pricePerUnit;

    private float discount;

    private Set<ProductAttributeResponse> productAttributes;

}
