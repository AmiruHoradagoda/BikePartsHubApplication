package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedAppointmentResponseDto;
import com.bphTeam.bikePartsHub.dto.request.appointmentRequestDto.AppointmentSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.response.appointmentResponseDto.AppointmentResponseDto;
import com.bphTeam.bikePartsHub.entity.Appointment;
import com.bphTeam.bikePartsHub.entity.ServiceType;
import com.bphTeam.bikePartsHub.utils.AppointmentStatus;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentService {
    List<ServiceType> getAllServices();
    ServiceType getServiceById(Long id);
    List<Appointment> getAppointmentsByDate(LocalDate date);
    void createAppointment(AppointmentSaveRequestDto appointmentDto);
    boolean isTimeSlotAvailable(LocalDate date, String startTime, int duration);
    List<String> getAvailableTimeSlots(LocalDate date, int duration);

    List<AppointmentResponseDto> getCustomerAppointments(Integer id);

    PaginatedAppointmentResponseDto getAllAppointmentDetails(int page, int size);

    String changeAppointmentStatus(long appointmentId, AppointmentStatus status);
}
