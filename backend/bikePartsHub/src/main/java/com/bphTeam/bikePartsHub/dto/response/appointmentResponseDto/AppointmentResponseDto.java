package com.bphTeam.bikePartsHub.dto.response.appointmentResponseDto;

import com.bphTeam.bikePartsHub.dto.ServiceTypeDto;
import com.bphTeam.bikePartsHub.utils.AppointmentStatus;
import lombok.Data;

import java.time.LocalDate;
@Data
public class AppointmentResponseDto {
    private String name;
    private String mobile;
    private LocalDate date;
    private String startTime;
    private int serviceDuration;
    private String plateNumber;
    private String engineOil;
    private double engineOilCost;
    private double totalCharge;
    private ServiceTypeDto serviceTypeDto;
    private AppointmentStatus appointmentStatus;
}