package com.bphTeam.bikePartsHub.dto.response;
import lombok.Data;
import java.util.List;

@Data
public class ServiceTypeDto {
    private Long id;
    private String serviceName;
    private double serviceDuration;
    private double serviceCost;
    private String description;
    private List<String> features;
}
