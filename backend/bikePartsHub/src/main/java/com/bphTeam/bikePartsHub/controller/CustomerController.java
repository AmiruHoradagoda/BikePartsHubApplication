package com.bphTeam.bikePartsHub.controller;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer")
@PreAuthorize("hasRole('CUSTOMER')")
public class CustomerController {
    @GetMapping
    @PreAuthorize("hasAuthority('customer:read')")
    public String get(){
        return "Get ::customer controller";
    }
    @PostMapping
    @PreAuthorize("hasAuthority('customer:create')")
    public String post(){
        return "Post ::customer controller";
    }
    @PutMapping
    @PreAuthorize("hasAuthority('customer:updatee')")
    public String put(){
        return "Put ::customer controller";
    }
    @DeleteMapping
    @PreAuthorize("hasAuthority('customer:delete')")
    public String delete(){
        return "Delete ::customer controller";
    }


}
