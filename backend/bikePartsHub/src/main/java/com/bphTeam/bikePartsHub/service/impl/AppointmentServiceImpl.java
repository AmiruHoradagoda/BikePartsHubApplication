package com.bphTeam.bikePartsHub.service.impl;

import com.bphTeam.bikePartsHub.entity.Appointment;
import com.bphTeam.bikePartsHub.entity.ServiceType;
import com.bphTeam.bikePartsHub.repository.AppointmentRepository;
import com.bphTeam.bikePartsHub.repository.ServiceTypeRepository;
import com.bphTeam.bikePartsHub.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
@Service
public class AppointmentServiceImpl implements AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @Override
    public List<ServiceType> getAllServices() {
        return serviceTypeRepository.findAll();
    }

    @Override
    public ServiceType getServiceById(Long id) {
        return serviceTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));
    }

    @Override
    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        return appointmentRepository.findByDate(date);
    }

    @Override
    public Appointment createAppointment(Appointment appointment) {
        if (!isTimeSlotAvailable(appointment.getDate(),
                appointment.getStartTime(),
                appointment.getServiceDuration())) {
            throw new RuntimeException("Time slot not available");
        }
        return appointmentRepository.save(appointment);
    }

    @Override
    public boolean isTimeSlotAvailable(LocalDate date, String startTime, int duration) {
        List<Appointment> existingAppointments = appointmentRepository.findByDate(date);
        int conflictCount = 0;

        LocalTime newStartTime = LocalTime.parse(startTime);
        LocalTime newEndTime = newStartTime.plusHours(duration);

        for (Appointment existing : existingAppointments) {
            LocalTime existingStart = LocalTime.parse(existing.getStartTime());
            LocalTime existingEnd = existingStart.plusHours(existing.getServiceDuration());

            if (!(newEndTime.isBefore(existingStart) || newStartTime.isAfter(existingEnd))) {
                conflictCount++;
                if (conflictCount >= 3) {
                    return false;
                }
            }
        }

        return newEndTime.isBefore(LocalTime.of(17, 0));
    }

    @Override
    public List<String> getAvailableTimeSlots(LocalDate date, int duration) {
        List<String> availableSlots = new ArrayList<>();
        LocalTime startTime = LocalTime.of(8, 0);
        LocalTime endTime = LocalTime.of(17, 0);

        while (startTime.plusHours(duration).isBefore(endTime) ||
                startTime.plusHours(duration).equals(endTime)) {
            if (isTimeSlotAvailable(date, startTime.toString(), duration)) {
                availableSlots.add(startTime.toString());
            }
            startTime = startTime.plusMinutes(30);
        }

        return availableSlots;
    }
}
