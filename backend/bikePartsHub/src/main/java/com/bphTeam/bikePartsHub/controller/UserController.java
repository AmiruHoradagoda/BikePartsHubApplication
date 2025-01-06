package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.response.UserResponseDto;
import com.bphTeam.bikePartsHub.service.UserService;
import com.bphTeam.bikePartsHub.utils.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/getUserDetails/{id}")
    private ResponseEntity<StandardResponse> getUserDetails(@RequestParam(value = "id") Long userId) {
        UserResponseDto userDetails = userService.getUserDetails(userId);
        return new ResponseEntity<StandardResponse>(new StandardResponse(200, "User Details sent", userDetails), HttpStatus.OK);
    }
}
