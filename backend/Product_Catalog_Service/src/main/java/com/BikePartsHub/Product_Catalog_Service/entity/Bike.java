package com.BikePartsHub.Product_Catalog_Service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Bike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bike_id")
    private Long bikeId;
    private String type;
    private String model;
    private String version;
    private String manufacture;

    @ManyToMany(mappedBy = "bikes")
    private Set<ProductAttribute> productAttributes;

}
