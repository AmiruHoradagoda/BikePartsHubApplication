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
    private int duration;
    private double price;
    private String description;
    @ElementCollection
    private List<String> features;
}
