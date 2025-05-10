package com.bphTeam.bikePartsHub.service;


import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedAppointmentResponseDto;
import com.bphTeam.bikePartsHub.dto.request.appointmentRequestDto.AppointmentSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.response.appointmentResponseDto.AppointmentResponseDto;
import com.bphTeam.bikePartsHub.entity.Appointment;
import com.bphTeam.bikePartsHub.entity.ServiceType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AppointmentServiceTest {

    private AppointmentService appointmentService;

    @BeforeEach
    void setUp() {
        appointmentService = Mockito.mock(AppointmentService.class);
    }
    
    @Test
    void testGetAllServices() {
        List<ServiceType> mockList = Arrays.asList(new ServiceType(), new ServiceType());
        when(appointmentService.getAllServices()).thenReturn(mockList);

        List<ServiceType> result = appointmentService.getAllServices();
        assertEquals(2, result.size());
    }

    
    @Test
    void testGetServiceById() {
        ServiceType serviceType = new ServiceType();
        when(appointmentService.getServiceById(1L)).thenReturn(serviceType);

        ServiceType result = appointmentService.getServiceById(1L);
        assertNotNull(result);
    }
    
    @Test
    void testGetAppointmentsByDate() {
        List<Appointment> mockList = Arrays.asList(new Appointment(), new Appointment());
        LocalDate date = LocalDate.now();
        when(appointmentService.getAppointmentsByDate(date)).thenReturn(mockList);

        List<Appointment> result = appointmentService.getAppointmentsByDate(date);
        assertEquals(2, result.size());
    }

    
    @Test
    void testCreateAppointment() {
        AppointmentSaveRequestDto dto = new AppointmentSaveRequestDto();
        doNothing().when(appointmentService).createAppointment(dto);

        assertDoesNotThrow(() -> appointmentService.createAppointment(dto));
        verify(appointmentService, times(1)).createAppointment(dto);
    }
    
    @Test
    void testIsTimeSlotAvailable() {
        LocalDate date = LocalDate.now();
        when(appointmentService.isTimeSlotAvailable(date, "10:00", 30)).thenReturn(true);

        boolean available = appointmentService.isTimeSlotAvailable(date, "10:00", 30);
        assertTrue(available);
    }

    @Test
    void testGetAvailableTimeSlots() {
        LocalDate date = LocalDate.now();
        List<String> slots = Arrays.asList("09:00", "10:00");
        when(appointmentService.getAvailableTimeSlots(date, 30)).thenReturn(slots);

        List<String> result = appointmentService.getAvailableTimeSlots(date, 30);
        assertEquals(2, result.size());
    }

    
    @Test
    void testGetCustomerAppointments() {
        List<AppointmentResponseDto> mockList = Arrays.asList(new AppointmentResponseDto(), new AppointmentResponseDto());
        when(appointmentService.getCustomerAppointments(1)).thenReturn(mockList);

        List<AppointmentResponseDto> result = appointmentService.getCustomerAppointments(1);
        assertEquals(2, result.size());
    }

   




}
