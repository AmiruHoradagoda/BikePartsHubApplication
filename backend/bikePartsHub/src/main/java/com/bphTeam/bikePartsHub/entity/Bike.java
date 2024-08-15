package com.bphTeam.bikePartsHub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Bike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bike_id")
    private Long bikeId;

    private String type;
    private String model;
    private String version;
    private String manufacture;

    @OneToMany(mappedBy = "bikes")
    private Set<ProductAttribute> productAttributes;
}