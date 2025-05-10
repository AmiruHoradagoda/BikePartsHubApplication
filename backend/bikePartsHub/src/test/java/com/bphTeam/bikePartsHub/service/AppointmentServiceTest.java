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



}
