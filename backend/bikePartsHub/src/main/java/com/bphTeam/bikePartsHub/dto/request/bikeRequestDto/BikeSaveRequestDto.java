package com.bphTeam.bikePartsHub.dto.request.bikeRequestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BikeSaveRequestDto {
    private String type;
    private String model;
    private String version;
    private String manufacture;

}
