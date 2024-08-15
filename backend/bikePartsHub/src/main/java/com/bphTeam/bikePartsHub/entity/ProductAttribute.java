package com.bphTeam.bikePartsHub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class ProductAttribute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_attribute_id")
    private Long productAttributeId;

    private String color;


    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name="bike_id",nullable = false)
    private Bike bikes;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductAttribute that = (ProductAttribute) o;
        return productAttributeId != null && productAttributeId.equals(that.productAttributeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productAttributeId);
    }

}
