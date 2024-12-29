package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderSaveRequestDto;
import com.bphTeam.bikePartsHub.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping(
            path = {"/save"}
    )
    public ResponseEntity<OrderSaveRequestDto> saveItem(@RequestBody OrderSaveRequestDto requestOderSaveDTO){
        String id  = orderService.addOrder(requestOderSaveDTO);

        return null;
    }

}