package com.bphTeam.bikePartsHub.entity;

import com.bphTeam.bikePartsHub.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Entity
@Data
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

    @OneToMany(mappedBy = "orders")
    private Set<OrderDetails> oderDetails;

    public Order(User byId, Date orderDate, double total) {
    }
}
