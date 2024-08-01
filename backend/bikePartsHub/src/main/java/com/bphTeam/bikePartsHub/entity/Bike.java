package com.bphTeam.bikePartsHub.entity;

import com.bphTeam.bikePartsHub.entity.enums.BikeManufactures;
import com.bphTeam.bikePartsHub.entity.enums.BikeModals;
import com.bphTeam.bikePartsHub.entity.enums.BikeTypes;
import com.bphTeam.bikePartsHub.entity.enums.BikeVersion;
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
    private Long bikeId;
    @Enumerated(EnumType.STRING)
    private BikeTypes type;
    @Enumerated(EnumType.STRING)
    private BikeModals model;
    @Enumerated(EnumType.STRING)
    private BikeVersion version;
    @Enumerated(EnumType.STRING)
    private BikeManufactures manufacture;

    @ManyToMany(mappedBy = "bikes")
    private Set<ProductAttribute> productAttributes;

}
