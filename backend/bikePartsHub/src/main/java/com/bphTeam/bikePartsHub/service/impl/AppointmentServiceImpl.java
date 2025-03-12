package com.bphTeam.bikePartsHub.service.impl;

import com.bphTeam.bikePartsHub.dto.ServiceTypeDto;
import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedAppointmentResponseDto;
import com.bphTeam.bikePartsHub.dto.request.appointmentRequestDto.AppointmentSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.response.appointmentResponseDto.AppointmentResponseDto;
import com.bphTeam.bikePartsHub.entity.Appointment;
import com.bphTeam.bikePartsHub.entity.ServiceType;
import com.bphTeam.bikePartsHub.mapper.AppointmentMapper;
import com.bphTeam.bikePartsHub.repository.AppointmentRepository;
import com.bphTeam.bikePartsHub.repository.ServiceTypeRepository;
import com.bphTeam.bikePartsHub.service.AppointmentService;
import com.bphTeam.bikePartsHub.utils.AppointmentStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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
        return appointmentRepository.findByStartDate(date);
    }

    @Override
    public void createAppointment(AppointmentSaveRequestDto appointmentDto) {
        // Get service type to check duration
        ServiceType serviceType = serviceTypeRepository.findById((long) appointmentDto.getServiceTypeId())
                .orElseThrow(() -> new RuntimeException("Service type not found"));

        // Check if time slot is available
        if (!isTimeSlotAvailable(appointmentDto.getStartDate(),
                appointmentDto.getStartTime(),
                (int) serviceType.getServiceDuration())) {
            throw new RuntimeException("Time slot not available");
        }

        // Calculate total charge if not set
        if (appointmentDto.getTotalCharge() == 0) {
            double totalCharge = serviceType.getServiceCost() + appointmentDto.getEngineOilCost();
            appointmentDto.setTotalCharge(totalCharge);
        }

        // Set initial appointment status if not set
        if (appointmentDto.getAppointmentStatus() == null) {
            appointmentDto.setAppointmentStatus(AppointmentStatus.UPCOMING);
        }

        // Create and save appointment
        Appointment appointment = appointmentMapper.toAppointment(appointmentDto);
        appointmentRepository.save(appointment);
    }

    @Override
    public boolean isTimeSlotAvailable(LocalDate date, String startTime, int duration) {
        List<Appointment> existingAppointments = appointmentRepository.findByStartDate(date);
        int conflictCount = 0;

        LocalTime newStartTime = LocalTime.parse(startTime);
        LocalTime newEndTime = newStartTime.plusHours(duration);

        // Check if the time is within business hours (8:00 - 17:00)
        LocalTime businessStart = LocalTime.of(8, 0);
        LocalTime businessEnd = LocalTime.of(17, 0);

        if (newStartTime.isBefore(businessStart) || newEndTime.isAfter(businessEnd)) {
            return false;
        }

        for (Appointment existing : existingAppointments) {
            LocalTime existingStart = LocalTime.parse(existing.getStartTime());
            LocalTime existingEnd = existingStart.plusHours((int) existing.getServiceType().getServiceDuration());

            if (!(newEndTime.isBefore(existingStart) || newStartTime.isAfter(existingEnd))) {
                conflictCount++;
                if (conflictCount >= 3) {  // Allow up to 3 concurrent appointments
                    return false;
                }
            }
        }

        return true;
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
        List<Appointment> appointments = appointmentRepository.findByUser_UserId(id);

        return appointments.stream()
                .map(appointment -> {
                    AppointmentResponseDto dto = appointmentMapper.toAppointmentResponseDto(appointment);

                    // Ensure serviceTypeDto is properly set
                    if (appointment.getServiceType() != null) {
                        ServiceTypeDto serviceTypeDto = appointmentMapper.toServiceTypeDto(appointment.getServiceType());
                        dto.setServiceTypeDto(serviceTypeDto);
                    }

                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public PaginatedAppointmentResponseDto getAllAppointmentDetails(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Appointment> appointmentsPage = appointmentRepository.findAll(pageable);

        Set<AppointmentResponseDto> appointmentDtos = appointmentsPage.getContent().stream()
                .map(appointment -> {
                    AppointmentResponseDto dto = appointmentMapper.toAppointmentResponseDto(appointment);

                    // Ensure serviceTypeDto is properly set
                    if (appointment.getServiceType() != null) {
                        ServiceTypeDto serviceTypeDto = appointmentMapper.toServiceTypeDto(appointment.getServiceType());
                        dto.setServiceTypeDto(serviceTypeDto);
                    }

                    return dto;
                })
                .collect(Collectors.toSet());

        PaginatedAppointmentResponseDto response = new PaginatedAppointmentResponseDto();
        response.setAppointmentResponseDto(appointmentDtos);
        response.setDataCount(appointmentsPage.getTotalElements());

        return response;
    }
}