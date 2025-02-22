package com.bphTeam.bikePartsHub.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/items")
@PreAuthorize("permitAll()")
public class ItemController {

    // Create a new item
    @PostMapping("/add")
    @PreAuthorize("hasAuthority('admin:create')")
    public String addItem() {
        return "Item added successfully!";
    }

    // Read/Get an item by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('admin:read')")
    public String getItem(@PathVariable Long id) {
        return "Item details for ID: " + id;
    }

    // Update an item by ID
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('customer:update')")
    public String updateItem(@PathVariable Long id) {
        return "Item with ID " + id + " updated successfully!";
    }

    // Delete an item by ID
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('customer:delete')")
    public String deleteItem(@PathVariable Long id) {
        return "Item with ID " + id + " deleted successfully!";
    }
}