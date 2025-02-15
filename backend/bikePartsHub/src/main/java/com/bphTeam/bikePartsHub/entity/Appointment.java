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
    private String serviceName;//newly added
    private LocalDate date;
    private String startTime;
    private String engineOil;
    private double totalCharge;
    private AppointmentStatus appointmentStatus;
    private int serviceDuration;
    private String name;
    private String mobile;
    private String plateNumber;

    @ManyToOne
    @JoinColumn(name = "service_type_id")
    private ServiceType serviceType;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
