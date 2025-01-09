package com.bphTeam.bikePartsHub.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "orderId",nullable = false)
    @ToString.Exclude
    private Order orders;

    @ManyToOne
    @JoinColumn(name = "productId",nullable = false)
    private Product product;
}
