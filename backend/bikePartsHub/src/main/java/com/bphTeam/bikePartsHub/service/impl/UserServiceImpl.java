package com.bphTeam.bikePartsHub.service.impl;

import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedUserResponseDto;
import com.bphTeam.bikePartsHub.dto.response.orderResponseDto.OrderResponseDto;
import com.bphTeam.bikePartsHub.dto.response.customerResponseDto.CustomerProfileDto;
import com.bphTeam.bikePartsHub.dto.response.customerResponseDto.CustomerResponse;
import com.bphTeam.bikePartsHub.dto.response.customerResponseDto.CustomerResponseDto;
import com.bphTeam.bikePartsHub.entity.Order;
import com.bphTeam.bikePartsHub.mapper.OrderMapper;
import com.bphTeam.bikePartsHub.mapper.UserMapper;
import com.bphTeam.bikePartsHub.repository.AppointmentRepository;
import com.bphTeam.bikePartsHub.repository.OrderRepo;
import com.bphTeam.bikePartsHub.service.UserService;
import com.bphTeam.bikePartsHub.user.Role;
import com.bphTeam.bikePartsHub.user.User;
import com.bphTeam.bikePartsHub.user.UserRepo;
import com.bphTeam.bikePartsHub.utils.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public CustomerResponseDto getUserDetails(int userId) {
        User user = userRepo.getById(userId);
        Set<Order> orders = orderRepo.findOrderByUser(user);
        Set<OrderResponseDto>orderResponseDtos = orderMapper.toOrder(orders);
        CustomerResponseDto userResponseDto = CustomerResponseDto.builder()
                .userId(user.getUserId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .role(user.getRole())
                .orders(orderResponseDtos)
                .build();
        return userResponseDto;
    }

    @Override
    public PaginatedUserResponseDto getAllCustomerDetails(String customerName, Role role, int page, int size) {
        Set<Role> roles = Set.of(Role.CUSTOMER, Role.LOYAL_CUSTOMER);
        Pageable pageable = PageRequest.of(page, size);

        Page<User> customerPage = userRepo.getAllCustomers(
                customerName != null && !customerName.isEmpty() ? customerName : null,
                role,
                roles,
                pageable
        );

        Set<CustomerResponseDto> customerResponseDtos = new HashSet<>();
        for (User customer : customerPage.getContent()) {
            Set<Order> orders = orderRepo.findOrderByUser(customer);
            Set<OrderResponseDto> orderResponseDtos = orderMapper.toOrder(orders);

            CustomerResponseDto customerResponse = CustomerResponseDto.builder()
                    .userId(customer.getUserId())
                    .firstName(customer.getFirstName())
                    .lastName(customer.getLastName())
                    .email(customer.getEmail())
                    .phone(customer.getPhone())
                    .address(customer.getAddress())
                    .role(customer.getRole())
                    .orders(orderResponseDtos)
                    .build();
            customerResponseDtos.add(customerResponse);
        }
        PaginatedUserResponseDto PaginatedCustomerResponse = new PaginatedUserResponseDto(customerResponseDtos,customerPage.getTotalElements());

        return PaginatedCustomerResponse;
    }

    @Override
    public CustomerProfileDto getAllCustomerProfile(Integer id) {
        // Get user and map to CustomerResponse
        User user = userRepo.getById(id);
        CustomerResponse customerResponse = userMapper.toCustomerResponse(user);

        // Get all orders for the user
        Set<Order> userOrders = orderRepo.findOrderByUser(user);

        // Calculate total order count
        int totalOrder = userOrders.size();

        // Calculate total spending from all orders
        int totalSpend = userOrders.stream()
                .mapToInt(order -> order.getTotal().intValue())
                .sum();

        // Calculate order counts by status
        int pending = (int) userOrders.stream()
                .filter(order -> order.getStatus() == OrderStatus.PENDING)
                .count();

        int cancelled = (int) userOrders.stream()
                .filter(order -> order.getStatus() == OrderStatus.CANCELED)
                .count();

        int onTheWay = (int) userOrders.stream()
                .filter(order -> order.getStatus() == OrderStatus.PROCESSING)
                .count();

        int completed = (int) userOrders.stream()
                .filter(order -> order.getStatus() == OrderStatus.SHIPPED)
                .count();

        // Get all appointments for the user
        int totalSchedule = appointmentRepository.findByUser(user).size();

        // Create and return the DTO with all calculated values
        CustomerProfileDto profileDto = new CustomerProfileDto();
        profileDto.setCustomerResponse(customerResponse);
        profileDto.setTotalOrder(totalOrder);
        profileDto.setTotalSpend(totalSpend);
        profileDto.setTotalSchedule(totalSchedule);
        profileDto.setPending(pending);
        profileDto.setCancelled(cancelled);
        profileDto.setOnTheWay(onTheWay);
        profileDto.setCompleted(completed);

        return profileDto;
    }


}
