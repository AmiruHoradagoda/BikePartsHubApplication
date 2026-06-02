package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.response.ServiceTypeDto;
import com.bphTeam.bikePartsHub.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/services")
public class ServiceController {

    private final ServiceService serviceService;

    @GetMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<ServiceTypeDto>> getAllServices() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }

    @GetMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<ServiceTypeDto> getServiceById(@PathVariable Long id) {
        return ResponseEntity.ok(serviceService.getServiceById(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin:create')")
    public ResponseEntity<ServiceTypeDto> createService(@RequestBody ServiceTypeDto serviceTypeDto) {
        return new ResponseEntity<>(serviceService.createService(serviceTypeDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('admin:update')")
    public ResponseEntity<ServiceTypeDto> updateService(
            @PathVariable Long id,
            @RequestBody ServiceTypeDto serviceTypeDto) {
        return ResponseEntity.ok(serviceService.updateService(id, serviceTypeDto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('admin:delete')")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}
