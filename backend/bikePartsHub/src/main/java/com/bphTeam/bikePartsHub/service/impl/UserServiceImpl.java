package com.bphTeam.bikePartsHub.service.impl;

import com.bphTeam.bikePartsHub.dto.response.OrderResponseDto;
import com.bphTeam.bikePartsHub.dto.response.UserResponseDto;
import com.bphTeam.bikePartsHub.entity.Order;
import com.bphTeam.bikePartsHub.mapper.OrderMapper;
import com.bphTeam.bikePartsHub.repository.OrderRepo;
import com.bphTeam.bikePartsHub.service.UserService;
import com.bphTeam.bikePartsHub.user.Role;
import com.bphTeam.bikePartsHub.user.User;
import com.bphTeam.bikePartsHub.user.UserRepo;
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

    @Override
    public UserResponseDto getUserDetails(int userId) {
        User user = userRepo.getById(userId);
        Set<Order> orders = orderRepo.findOrderByUser(user);
        Set<OrderResponseDto>orderResponseDtos = orderMapper.toOrder(orders);
        UserResponseDto userResponseDto = UserResponseDto.builder()
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
    public Set<UserResponseDto> getAllCustomerDetails(String customerName, Role role, int page, int size) {
        Set<Role> roles = Set.of(Role.CUSTOMER, Role.LOYAL_CUSTOMER);
        Pageable pageable = PageRequest.of(page, size);

        Page<User> customerPage = userRepo.getAllCustomers(
                customerName != null && !customerName.isEmpty() ? customerName : null,
                role,
                roles,
                pageable
        );

        Set<UserResponseDto> customerResponseDtos = new HashSet<>();
        for (User customer : customerPage.getContent()) {
            Set<Order> orders = orderRepo.findOrderByUser(customer);
            Set<OrderResponseDto> orderResponseDtos = orderMapper.toOrder(orders);

            UserResponseDto customerResponse = UserResponseDto.builder()
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

        return customerResponseDtos;
    }


}
