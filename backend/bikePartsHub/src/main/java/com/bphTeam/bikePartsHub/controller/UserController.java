package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.request.userRequestDto.UserUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.response.UserResponseDto;
import com.bphTeam.bikePartsHub.dto.response.customerResponseDto.CustomerResponseDto;
import com.bphTeam.bikePartsHub.service.user.UserService;
import com.bphTeam.bikePartsHub.utils.StandardResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/getUserDetails/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<StandardResponseDto> getUserDetails(@PathVariable Integer id) {
        CustomerResponseDto userDetails = userService.getUserDetails(id);
        return new ResponseEntity<StandardResponseDto>(new StandardResponseDto(200, "User Details sent", userDetails), HttpStatus.OK);
    }
    @PutMapping("/updateProfile/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<StandardResponseDto> updateUserProfile(
            @PathVariable Integer id,
            @RequestBody UserUpdateRequestDto updateRequestDto) {
        UserResponseDto updatedUser = userService.updateUserProfile(id, updateRequestDto);
        return new ResponseEntity<>(
                new StandardResponseDto(200, "User profile updated successfully", updatedUser),
                HttpStatus.OK);
    }
}
