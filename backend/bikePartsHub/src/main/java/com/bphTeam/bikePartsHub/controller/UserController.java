package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.request.userRequestDto.UserSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.userRequestDto.UserUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.response.UserResponseDto;
import com.bphTeam.bikePartsHub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Create a new user
    @PostMapping("/add")
    public ResponseEntity<String> createUser(@RequestBody UserSaveRequestDto userDto) {
        String response = userService.addUser(userDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable("id") long userId) {
        UserResponseDto user = userService.getUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    // Get all users
    @GetMapping("/all")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Update user details
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(@PathVariable("id") long userId, @RequestBody UserUpdateRequestDto userDto) {
        String response = userService.updateUser(userId, userDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete a user
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") long userId) {
        String response = userService.deleteUser(userId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

