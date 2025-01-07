package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.response.UserResponseDto;
import com.bphTeam.bikePartsHub.service.UserService;
import com.bphTeam.bikePartsHub.user.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/admin")
//@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getAllCustomerDetails")
//    @PreAuthorize("hasAuthority('admin:read')")
    private ResponseEntity<Set<UserResponseDto>> getAllCustomerDetails(
            @RequestParam(required = false) String customerName,
            @RequestParam(required = false) Role role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size
    )
    {
        Set<UserResponseDto> customerDetails = userService.getAllCustomerDetails(customerName,role,page, size);
        return new ResponseEntity<Set<UserResponseDto>>(customerDetails, HttpStatus.OK);
    }

}
