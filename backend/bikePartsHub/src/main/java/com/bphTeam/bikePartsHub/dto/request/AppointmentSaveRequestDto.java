package com.bphTeam.bikePartsHub.dto.request;

import com.bphTeam.bikePartsHub.entity.ServiceType;
import com.bphTeam.bikePartsHub.user.User;
import com.bphTeam.bikePartsHub.utils.AppointmentStatus;
import lombok.Data;

import java.time.LocalDate;
@Data
public class AppointmentSaveRequestDto {
    private Long id;
    private int serviceDuration;
    private LocalDate date;
    private String startTime;
    private String name;
    private String mobile;
    private String plateNumber;
    private String engineOil;
    private double totalCharge;
    private ServiceType serviceType;
    private AppointmentStatus appointmentStatus;
    private User user;
}
