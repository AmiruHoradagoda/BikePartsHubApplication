package com.bphTeam.bikePartsHub.entity;

import com.bphTeam.bikePartsHub.user.User;
import com.bphTeam.bikePartsHub.utils.AppointmentStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;


@Entity
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customerName;
    private String mobile;
    private String plateNumber;
    private LocalDate startDate;
    private String startTime;
    private String engineOil;
    private double engineOilCost;
    private double totalCharge;
    private AppointmentStatus appointmentStatus;

    @ManyToOne
    @JoinColumn(name = "service_Type_Id")
    private ServiceType serviceType;

    @ManyToOne
    @JoinColumn(name = "user_Id")
    private User user;
}
