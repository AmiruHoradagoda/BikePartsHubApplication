package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderSaveRequestDto;
import com.bphTeam.bikePartsHub.service.OrderService;
import com.bphTeam.bikePartsHub.utils.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<StandardResponse> saveItem(@RequestBody OrderSaveRequestDto requestOderSaveDTO){
        String message  = orderService.addOrder(requestOderSaveDTO);

        return new ResponseEntity<StandardResponse>(new StandardResponse(201,"Order is Saved",message), HttpStatus.CREATED);
    }

}