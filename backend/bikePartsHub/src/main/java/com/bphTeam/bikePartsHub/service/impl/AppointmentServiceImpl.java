package com.bphTeam.bikePartsHub.service.impl;

import com.bphTeam.bikePartsHub.dto.request.AppointmentSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.response.AppointmentResponseDto;
import com.bphTeam.bikePartsHub.entity.Appointment;
import com.bphTeam.bikePartsHub.entity.ServiceType;
import com.bphTeam.bikePartsHub.mapper.AppointmentMapper;
import com.bphTeam.bikePartsHub.repository.AppointmentRepository;
import com.bphTeam.bikePartsHub.repository.ServiceTypeRepository;
import com.bphTeam.bikePartsHub.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ServiceTypeRepository serviceTypeRepository;
    @Autowired
    private AppointmentMapper appointmentMapper;

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
    public void createAppointment(AppointmentSaveRequestDto appointmentDto) {
        if (!isTimeSlotAvailable(appointmentDto.getDate(),
                appointmentDto.getStartTime(),
                appointmentDto.getServiceDuration())) {
            throw new RuntimeException("Time slot not available");
        }
        Appointment appointment = appointmentMapper.toAppointment(appointmentDto);
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

    @Override
    public List<AppointmentResponseDto> getCustomerAppointments(Integer id) {
        // Get appointments directly using user id
        List<Appointment> appointments = appointmentRepository.findByUser_UserId(id);

        // Map appointments to DTOs with hardcoded values for new fields
        return appointments.stream()
                .map(appointment -> {
                    AppointmentResponseDto dto = appointmentMapper.toAppointmentResponseDto(appointment);
                    // Set hardcoded values for new fields
                    dto.setServiceName("Full Service");
                    dto.setServiceCharge(3455.00);  // Hardcoded service charge
                    dto.setOilCharge(345.00);       // Hardcoded oil charge
                    dto.setNotes("Tire needs to be repaired Tire needs to be repaired Tire needs to be repaired");
                    dto.setTotalCharge(dto.getServiceCharge() + dto.getOilCharge()); // Calculate total
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
