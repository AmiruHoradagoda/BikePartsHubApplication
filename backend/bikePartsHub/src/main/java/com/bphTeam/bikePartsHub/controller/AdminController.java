package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.response.CustomerResponseDto;
import com.bphTeam.bikePartsHub.dto.response.UserResponseDto;
import com.bphTeam.bikePartsHub.service.UserService;
import com.bphTeam.bikePartsHub.utils.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
//    @GetMapping
//    @PreAuthorize("hasAuthority('admin:read')")
//    public String get(){
//        return "Get ::Admin controller";
//    }
//    @PostMapping
//    @PreAuthorize("hasAuthority('admin:create')")
//    public String post(){
//        return "Post ::Admin controller";
//    }
//    @PutMapping
//    @PreAuthorize("hasAuthority('admin:updatee')")
//    public String put(){
//        return "Put ::Admin controller";
//    }
//    @DeleteMapping
//    @PreAuthorize("hasAuthority('admin:delete')")
//    public String delete(){
//        return "Delete ::Admin controller";
//    }

    @Autowired
    private UserService userService;

    @GetMapping("/getAllCustomerDetails")
    private ResponseEntity<Set<CustomerResponseDto>> getAllCustomerDetails(@RequestParam(defaultValue = "0") int page,
                                                                   @RequestParam(defaultValue = "9") int size) {
        Set<CustomerResponseDto> customerDetails = userService.getAllCustomerDetails(page,size);
        return new ResponseEntity<Set<CustomerResponseDto>>(customerDetails, HttpStatus.OK);
    }

}
