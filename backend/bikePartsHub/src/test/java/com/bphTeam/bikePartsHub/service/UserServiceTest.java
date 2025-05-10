package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.service.UserService;
import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedUserResponseDto;
import com.bphTeam.bikePartsHub.dto.response.customerResponseDto.CustomerProfileDto;
import com.bphTeam.bikePartsHub.dto.response.customerResponseDto.CustomerResponseDto;
import com.bphTeam.bikePartsHub.user.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

     @Test
    void testGetUserDetails() {
        CustomerResponseDto mockResponse = mock(CustomerResponseDto.class);
        when(userService.getUserDetails(1)).thenReturn(mockResponse);
        assertEquals(mockResponse, userService.getUserDetails(1));
    }

      @Test
    void testGetAllCustomerDetails() {
        PaginatedUserResponseDto mockResponse = mock(PaginatedUserResponseDto.class);
        when(userService.getAllCustomerDetails("John", Role.CUSTOMER, 0, 10)).thenReturn(mockResponse);
        assertEquals(mockResponse, userService.getAllCustomerDetails("John", Role.CUSTOMER, 0, 10));
    }

    @Test
    void testGetAllCustomerProfile() {
        CustomerProfileDto mockProfile = mock(CustomerProfileDto.class);
        when(userService.getAllCustomerProfile(1)).thenReturn(mockProfile);
        assertEquals(mockProfile, userService.getAllCustomerProfile(1));
    }
 
}