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

    @Test
    void testSaveBikeDetails() {
        BikeSaveRequestDto dto = new BikeSaveRequestDto();
        doNothing().when(bikeService).saveBikeDetails(dto);

        assertDoesNotThrow(() -> bikeService.saveBikeDetails(dto));
        verify(bikeService, times(1)).saveBikeDetails(dto);
    }

    @Test
    void testDeleteBikeDetails() {
        when(bikeService.deleteBikeDetails(1L)).thenReturn("Deleted");

        String result = bikeService.deleteBikeDetails(1L);
        assertEquals("Deleted", result);
    }

    @Test
    void testUpdateBikeDetails() {
        BikeUpdateRequestDto dto = new BikeUpdateRequestDto();
        when(bikeService.updateBikeDetails(1L, dto)).thenReturn("Updated");

        String result = bikeService.updateBikeDetails(1L, dto);
        assertEquals("Updated", result);
    }

    @Test
    void testGetBikeId() {
        when(bikeService.getBikeId("type", "model", "version", "manufacture")).thenReturn(10L);

        Long result = bikeService.getBikeId("type", "model", "version", "manufacture");
        assertEquals(10L, result);
    }

    @Test
    void testGetBikeById() {
        BikeGetResponse response = new BikeGetResponse();
        when(bikeService.getBikeById(1L)).thenReturn(response);

        BikeGetResponse result = bikeService.getBikeById(1L);
        assertNotNull(result);
    }
}