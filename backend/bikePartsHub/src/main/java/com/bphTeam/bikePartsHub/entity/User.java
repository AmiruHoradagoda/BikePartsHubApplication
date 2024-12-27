package com.bphTeam.bikePartsHub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    private String userName;

    private String email;

    private String userRole;

    private String mobileNumber;

    @OneToMany(mappedBy = "user")
    private Set<Order> orders;


}
