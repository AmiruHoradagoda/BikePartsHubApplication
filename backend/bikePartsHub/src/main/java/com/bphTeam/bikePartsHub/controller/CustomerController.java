package com.bphTeam.bikePartsHub.controller;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer")
@PreAuthorize("hasAnyRole('CUSTOMER', 'LOYAL_CUSTOMER')")
public class CustomerController {
    @GetMapping
    @PreAuthorize("hasAnyAuthority('customer:read', 'loyal_customer:read')")
    public String get(){
        return "Get ::customer controller";
    }
    @PostMapping
    @PreAuthorize("hasAnyAuthority('customer:create', 'loyal_customer:create')")
    public String post(){
        return "Post ::customer controller";
    }
    @PutMapping
    @PreAuthorize("hasAnyAuthority('customer:update', 'loyal_customer:update')")
    public String put(){
        return "Put ::customer controller";
    }
    @DeleteMapping
    @PreAuthorize("hasAnyAuthority('customer:delete', 'loyal_customer:delete')")
    public String delete(){
        return "Delete ::customer controller";
    }


}
