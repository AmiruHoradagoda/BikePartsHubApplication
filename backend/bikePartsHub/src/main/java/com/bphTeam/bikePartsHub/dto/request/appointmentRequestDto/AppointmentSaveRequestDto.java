package com.bphTeam.bikePartsHub.dto.request.appointmentRequestDto;

import com.bphTeam.bikePartsHub.utils.AppointmentStatus;
import lombok.Data;

import java.time.LocalDate;
@Data
public class AppointmentSaveRequestDto {
    private String customerName;
    private String mobile;
    private LocalDate startDate;
    private String startTime;
    private String plateNumber;
    private String engineOil;
    private double engineOilCost;
    private double totalCharge;
    private int serviceTypeId;
    private AppointmentStatus appointmentStatus;
    private int userId;
}
