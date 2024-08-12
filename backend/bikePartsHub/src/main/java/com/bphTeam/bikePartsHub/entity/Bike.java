package com.bphTeam.bikePartsHub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Bike {
    @Id
    @Column(name = "bike_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bikeId;
    private String type;
    private String model;
    private String version;
    private String manufacture;

    @ManyToMany(mappedBy = "bikes")
    private Set<ProductAttribute> productAttributes;

}
