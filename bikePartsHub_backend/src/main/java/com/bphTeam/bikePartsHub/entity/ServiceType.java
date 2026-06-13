package com.bphTeam.bikePartsHub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class ServiceType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String serviceName;
    private double serviceDuration;
    private double serviceCost;
    private String description;
    @ElementCollection
    private List<String> features;
}
