package com.bphTeam.bikePartsHub.entity;


import com.bphTeam.bikePartsHub.entity.enums.ProductType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productId;

    private String productName;

    @Enumerated(EnumType.STRING)
    private ProductType productType;

    private String quantity;

    private String category;

    private String manufacture;

    private String itemDescription;
    @Column(name="active_state",columnDefinition = "TINYINT default 0")
    private boolean activeState;

    private float averageRating;

    private float pricePerUnit;

    private float discount;

    private String imageUrl;

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProductAttribute> productAttributes = new HashSet<>();;



    // Method to add a product attribute
    public void addProductAttribute(ProductAttribute attribute) {
        productAttributes.add(attribute);
        attribute.setProduct(this);
    }

    // Method to remove a product attribute (optional)
    public void removeProductAttribute(ProductAttribute attribute) {
        productAttributes.remove(attribute);
        attribute.setProduct(null);
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return productId == product.productId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId);
    }

}
