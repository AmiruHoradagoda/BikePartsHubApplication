package com.bphTeam.bikePartsHub.entity;

import com.bphTeam.bikePartsHub.user.User;
import com.bphTeam.bikePartsHub.utils.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "customer_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderId;

    @ManyToOne
    @JoinColumn(name="user_Id",nullable = false)
    private User user;

    @Column(name = "order_date",columnDefinition = "DATETIME")
    private LocalDateTime date;

    @Column(name = "total" , nullable = false)
    private Double total;

    @OneToMany(mappedBy = "orders", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @ToString.Exclude
    private Set<OrderDetails> orderDetails = new HashSet<>();;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shipping_address_id", referencedColumnName = "shipping_id", nullable = false)
    private ShippingAddress shippingAddress;

    private OrderStatus status;

    public Order(User byId, Date orderDate, double total) {
    }
}
