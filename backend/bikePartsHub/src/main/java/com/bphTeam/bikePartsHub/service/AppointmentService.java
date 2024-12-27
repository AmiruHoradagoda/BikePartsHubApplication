package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.entity.Appointment;
import com.bphTeam.bikePartsHub.entity.ServiceType;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentService {
    List<ServiceType> getAllServices();
    ServiceType getServiceById(Long id);
    List<Appointment> getAppointmentsByDate(LocalDate date);
    Appointment createAppointment(Appointment appointment);
    boolean isTimeSlotAvailable(LocalDate date, String startTime, int duration);
    List<String> getAvailableTimeSlots(LocalDate date, int duration);
}
