package com.bphTeam.bikePartsHub.controller;


import com.bphTeam.bikePartsHub.service.BikeService;
import com.bphTeam.bikePartsHub.dto.response.BikeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/bikes")
@CrossOrigin
public class BikeController {
    private final BikeService bikeService;

    @Autowired
    public BikeController(BikeService bikeService) {
        this.bikeService = bikeService;
    }

    @GetMapping("/getAllBikes")
    private ResponseEntity<List<BikeResponse>>getAllBikeDetails(){
        List<BikeResponse> bikeResponse = bikeService.getAllBikeDetails();
        return ResponseEntity.ok(bikeResponse);
    }

    @PostMapping("/save")
    private ResponseEntity<Void>saveBikeDetails(@RequestBody BikeResponse bikeResponse){
       bikeService.saveBikeDetails(bikeResponse);
       return ResponseEntity.ok().build();
    }


    @PutMapping("/update")
    private  String updateBikeDetails(@RequestBody BikeResponse bikeResponse){
        String message = bikeService.updateBikeDetails(bikeResponse);
        return message;
    }



    @DeleteMapping("/delete")
    private  String deleteBikeDetails(@RequestBody Long bike_id){
        String message = bikeService.deleteBikeDetails(bike_id);
        return message;
    }
}

