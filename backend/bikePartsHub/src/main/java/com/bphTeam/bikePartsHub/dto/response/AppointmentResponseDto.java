package com.bphTeam.bikePartsHub.dto.response;

import com.bphTeam.bikePartsHub.utils.AppointmentStatus;
import lombok.Data;

import java.time.LocalDate;
@Data
public class AppointmentResponseDto {
    private Long id;
    private String serviceName;
    private int serviceDuration;
    private LocalDate date;
    private String startTime;
    private String engineOil;
    private double serviceCharge;//newly added
    private double oilCharge; //newly added
    private double totalCharge;
    private String notes;//newly added
    private AppointmentStatus appointmentStatus;
}