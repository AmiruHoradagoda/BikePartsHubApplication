package com.bphTeam.bikePartsHub.dto.request.orderRequestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class ShippingAddressRequestDto {

    private String address;
    private String state;
    private String district;
    private String city;
    private String postalCode;

}
