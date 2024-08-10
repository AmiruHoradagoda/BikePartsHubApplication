package com.bphTeam.bikePartsHub.dto.request.productRequestDto;

import com.bphTeam.bikePartsHub.dto.request.productAttributeDto.ProductAttributeSaveRequestDto;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductSaveRequestDto {

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

    private String imageUrl;

    private Set<ProductAttributeSaveRequestDto> productAttributes;

}
