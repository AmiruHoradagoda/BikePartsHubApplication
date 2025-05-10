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

}