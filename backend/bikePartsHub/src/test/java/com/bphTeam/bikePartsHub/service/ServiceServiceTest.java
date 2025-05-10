package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.response.ServiceTypeDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ServiceServiceTest {

    private ServiceService serviceService;

    @BeforeEach
    void setUp() {
        serviceService = Mockito.mock(ServiceService.class);
    }
    @Test
    void testGetAllServices() {
        List<ServiceTypeDto> mockList = Arrays.asList(new ServiceTypeDto(), new ServiceTypeDto());
        when(serviceService.getAllServices()).thenReturn(mockList);

        List<ServiceTypeDto> result = serviceService.getAllServices();
        assertEquals(2, result.size());
    }
    @Test
    void testGetServiceById() {
        ServiceTypeDto dto = new ServiceTypeDto();
        when(serviceService.getServiceById(1L)).thenReturn(dto);

        ServiceTypeDto result = serviceService.getServiceById(1L);
        assertNotNull(result);
    }





}