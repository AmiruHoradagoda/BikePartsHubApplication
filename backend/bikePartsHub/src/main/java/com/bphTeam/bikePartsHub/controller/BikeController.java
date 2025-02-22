package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.request.bikeRequestDto.BikeSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.bikeRequestDto.BikeUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.response.BikeGetResponse;
import com.bphTeam.bikePartsHub.service.BikeService;
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
    private ResponseEntity<List<BikeGetResponse>>getAllBikeDetails(){
        List<BikeGetResponse> bikeResponse = bikeService.getAllBikeDetails();
        return ResponseEntity.ok(bikeResponse);
    }

    @PostMapping("/save")
    private ResponseEntity<Void>saveBikeDetails(@RequestBody BikeSaveRequestDto bikeSaveRequestDto){
       bikeService.saveBikeDetails(bikeSaveRequestDto);
       return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/update",params = "id")
    public String updateBikeDetails(@RequestParam Long id, @RequestBody BikeUpdateRequestDto bikeUpdateRequestDto) {
        String message = bikeService.updateBikeDetails(id, bikeUpdateRequestDto);
        return message;
    }

    @GetMapping("/getBikeId")
    public Long getBikeId(
            @RequestParam String type,
            @RequestParam String model,
            @RequestParam String version,
            @RequestParam String manufacture) {
        return bikeService.getBikeId(type, model, version, manufacture);
    }

    @GetMapping("/getBikeById")
    public ResponseEntity<BikeGetResponse> getBikeById(
            @RequestParam Long bikeId) {
        BikeGetResponse bikeResponse = bikeService.getBikeById(bikeId);
        return ResponseEntity.ok(bikeResponse);
    }

    @DeleteMapping("/delete")
    private  String deleteBikeDetails(@RequestBody Long bike_id){
        String message = bikeService.deleteBikeDetails(bike_id);
        return message;
    }
}

