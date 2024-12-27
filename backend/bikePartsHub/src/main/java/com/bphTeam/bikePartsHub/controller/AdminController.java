package com.bphTeam.bikePartsHub.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @GetMapping
    @PreAuthorize("hasAuthority('admin:read')")
    public String get(){
        return "Get ::Admin controller";
    }
    @PostMapping
    @PreAuthorize("hasAuthority('admin:create')")
    public String post(){
        return "Post ::Admin controller";
    }
    @PutMapping
    @PreAuthorize("hasAuthority('admin:updatee')")
    public String put(){
        return "Put ::Admin controller";
    }
    @DeleteMapping
    @PreAuthorize("hasAuthority('admin:delete')")
    public String delete(){
        return "Delete ::Admin controller";
    }


}
