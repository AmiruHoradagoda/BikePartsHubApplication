package com.bphTeam.bikePartsHub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDetails {

    @Id
    @Column(name = "order_details_id",length = 45)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderDetailId;

    @Column(name = "product_name",length = 100,nullable = false)
    private String productName;

    @Column(name = "qty", length = 100,nullable = false)
    private int qty;

    @Column(name = "amount",nullable = false)
    private double amount;

    @ManyToOne
    @JoinColumn(name = "orderId",nullable = false)
    private Order orders;

    @ManyToOne
    @JoinColumn(name = "productId",nullable = false)
    private Product product;
}
