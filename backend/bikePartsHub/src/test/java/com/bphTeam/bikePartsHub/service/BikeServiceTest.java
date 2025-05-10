package com.bphTeam.bikePartsHub.service;


import com.bphTeam.bikePartsHub.dto.request.bikeRequestDto.BikeSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.bikeRequestDto.BikeUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.response.BikeGetResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BikeServiceTest {

    private BikeService bikeService;

    @BeforeEach
    void setUp() {
        bikeService = Mockito.mock(BikeService.class);
    }

    @Test
    void testGetAllBikeDetails() {
        List<BikeGetResponse> mockList = Arrays.asList(new BikeGetResponse(), new BikeGetResponse());
        when(bikeService.getAllBikeDetails()).thenReturn(mockList);

        List<BikeGetResponse> result = bikeService.getAllBikeDetails();
        assertEquals(2, result.size());
    }

}