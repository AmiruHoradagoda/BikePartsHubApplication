package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.request.AppointmentSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.response.AppointmentResponseDto;
import com.bphTeam.bikePartsHub.entity.Appointment;
import com.bphTeam.bikePartsHub.entity.ServiceType;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentService {
    List<ServiceType> getAllServices();
    ServiceType getServiceById(Long id);
    List<Appointment> getAppointmentsByDate(LocalDate date);
    Appointment createAppointment(AppointmentSaveRequestDto appointmentDto);
    boolean isTimeSlotAvailable(LocalDate date, String startTime, int duration);
    List<String> getAvailableTimeSlots(LocalDate date, int duration);

    List<AppointmentResponseDto> getCustomerAppointments(Integer id);
}
