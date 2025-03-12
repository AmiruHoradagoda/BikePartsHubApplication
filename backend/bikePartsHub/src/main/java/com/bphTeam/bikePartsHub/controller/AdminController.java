package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedAppointmentResponseDto;
import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedOrderResponseWithDetailsDto;
import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedUserResponseDto;
import com.bphTeam.bikePartsHub.dto.response.appointmentResponseDto.AppointmentResponseDto;
import com.bphTeam.bikePartsHub.dto.response.customerResponseDto.CustomerProfileDto;
import com.bphTeam.bikePartsHub.service.AppointmentService;
import com.bphTeam.bikePartsHub.service.OrderService;
import com.bphTeam.bikePartsHub.service.UserService;
import com.bphTeam.bikePartsHub.user.Role;
import com.bphTeam.bikePartsHub.utils.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
    private final UserService userService;
    private final OrderService orderService;
    private final AppointmentService appointmentService;

    @Autowired
    public AdminController(UserService userService, OrderService orderService, AppointmentService appointmentService) {

        this.userService = userService;
        this.orderService = orderService;
        this.appointmentService = appointmentService;
    }

    @GetMapping("/getAllCustomerDetails")
    private ResponseEntity<PaginatedUserResponseDto> getAllCustomerDetails(
            @RequestParam(required = false) String customerName,
            @RequestParam(required = false) Role role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size
    ) {
        PaginatedUserResponseDto customerDetails = userService.getAllCustomerDetails(customerName, role, page, size);
        return new ResponseEntity<PaginatedUserResponseDto>(customerDetails, HttpStatus.OK);
    }

    @GetMapping("/getAllAppointmentDetails")
    private ResponseEntity<PaginatedAppointmentResponseDto> getAllAppointmentDetails(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size
    ) {
        PaginatedAppointmentResponseDto appointmentDetails = appointmentService.getAllAppointmentDetails(page, size);
        return new ResponseEntity<PaginatedAppointmentResponseDto>(appointmentDetails, HttpStatus.OK);
    }

    @GetMapping("/getCustomerProfile/{id}")
    private ResponseEntity<CustomerProfileDto> getCustomerProfile(@PathVariable Integer id) {
        CustomerProfileDto customerProfile = userService.getAllCustomerProfile(id);
        return ResponseEntity.ok(customerProfile);
    }


    @GetMapping("/getCustomerOrders/{id}")
    private ResponseEntity<PaginatedOrderResponseWithDetailsDto> getCustomerOrders(@PathVariable Integer id, @RequestParam(required = false) OrderStatus orderStatus,
                                                                                   @RequestParam(defaultValue = "0") int page,
                                                                                   @RequestParam(defaultValue = "9") int size) {
        PaginatedOrderResponseWithDetailsDto cusOrderDetails = orderService.getCustomerOrders(id, page, size);
        return ResponseEntity.ok(cusOrderDetails);
    }

    @GetMapping("/getCustomerAppointments/{id}")
    private ResponseEntity<List<AppointmentResponseDto>> getCustomerAppointment(@PathVariable Integer id) {
        List<AppointmentResponseDto> appointmentResponseDtos = appointmentService.getCustomerAppointments(id);
        return ResponseEntity.ok(appointmentResponseDtos);
    }

    @GetMapping("/getAllOrderDetails")
    private ResponseEntity<PaginatedOrderResponseWithDetailsDto> getAllOrderDetails(
            @RequestParam(required = false) OrderStatus orderStatus,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size
    ) {
        PaginatedOrderResponseWithDetailsDto orderDetails = orderService.getAllOrderDetails(orderStatus, page, size);
        return new ResponseEntity<PaginatedOrderResponseWithDetailsDto>(orderDetails, HttpStatus.OK);
    }

    @PutMapping("/changeOrderStatus")
    private ResponseEntity<String> changeOrderStatus(
            @RequestParam long orderId,
            @RequestParam OrderStatus status
    ) {
        String message = orderService.changeOrderStatus(orderId, status);
        return new ResponseEntity<String>(message, HttpStatus.OK);
    }

}
