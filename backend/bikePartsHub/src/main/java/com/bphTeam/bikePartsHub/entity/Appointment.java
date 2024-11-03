package com.bphTeam.bikePartsHub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;


@Entity
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int serviceDuration;
    private LocalDate date;
    private String startTime;
    private String name;
    private String mobile;
    private String plateNumber;
    private String engineOil;
    private double totalCharge;

    @ManyToOne
    @JoinColumn(name = "service_type_id")
    private ServiceType serviceType;

}
