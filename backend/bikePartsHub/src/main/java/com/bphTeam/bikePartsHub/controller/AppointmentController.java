package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.request.appointmentRequestDto.AppointmentSaveRequestDto;
import com.bphTeam.bikePartsHub.entity.Appointment;
import com.bphTeam.bikePartsHub.entity.ServiceType;
import com.bphTeam.bikePartsHub.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/appointment")
@CrossOrigin
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/services")
    public ResponseEntity<List<ServiceType>> getAllServices() {
        return ResponseEntity.ok(appointmentService.getAllServices());
    }

    @GetMapping("/services/{id}")
    public ResponseEntity<ServiceType> getServiceById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getServiceById(id));
    }

    @GetMapping("/appointments")
    public ResponseEntity<List<Appointment>> getAppointmentsByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByDate(date));
    }

    @GetMapping("/time-slots")
    public ResponseEntity<List<String>> getAvailableTimeSlots(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam int duration) {
        return ResponseEntity.ok(appointmentService.getAvailableTimeSlots(date, duration));
    }

    @PostMapping("/appointments")
    public ResponseEntity<Void> createAppointment(@RequestBody AppointmentSaveRequestDto appointmentDto) {
        appointmentService.createAppointment(appointmentDto);
        return ResponseEntity.ok().build();
    }
}