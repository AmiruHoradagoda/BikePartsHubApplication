package com.bphTeam.bikePartsHub.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor
@NoArgsConstructor
@Data
public class BikeGetResponse {
    private Long bikeId;
    private String type;
    private String model;
    private String version;
    private String manufacture;
}
