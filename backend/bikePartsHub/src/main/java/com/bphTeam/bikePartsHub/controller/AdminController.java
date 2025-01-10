package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedOrderResponseWithDetailsDto;
import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedUserResponseDto;
import com.bphTeam.bikePartsHub.service.OrderService;
import com.bphTeam.bikePartsHub.service.UserService;
import com.bphTeam.bikePartsHub.user.Role;
import com.bphTeam.bikePartsHub.utils.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
//@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final UserService userService;
    private final OrderService orderService;
    @Autowired
    public AdminController(UserService userService, OrderService orderService) {

        this.userService = userService;
        this.orderService = orderService;
    }

    @GetMapping("/getAllCustomerDetails")
//    @PreAuthorize("hasAuthority('admin:read')")
    private ResponseEntity<PaginatedUserResponseDto> getAllCustomerDetails(
            @RequestParam(required = false) String customerName,
            @RequestParam(required = false) Role role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size
    )
    {
        PaginatedUserResponseDto customerDetails = userService.getAllCustomerDetails(customerName,role,page, size);
        return new ResponseEntity<PaginatedUserResponseDto>(customerDetails, HttpStatus.OK);
    }

    @GetMapping("/getAllOrderDetails")
    private ResponseEntity<PaginatedOrderResponseWithDetailsDto> getAllOrderDetails(
            @RequestParam(required = false) OrderStatus orderStatus,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size
    )
    {
        PaginatedOrderResponseWithDetailsDto orderDetails = orderService.getAllOrderDetails(orderStatus,page, size);
        return new ResponseEntity<PaginatedOrderResponseWithDetailsDto>(orderDetails, HttpStatus.OK);
    }

    @PutMapping("/changeOrderStatus")
    private ResponseEntity<String>changeOrderStatus(
            @RequestParam long orderId,
            @RequestParam OrderStatus status
    ){
       String message = orderService.changeOrderStatus(orderId,status);
        return new ResponseEntity<String>(message,HttpStatus.OK) ;
    }


}
