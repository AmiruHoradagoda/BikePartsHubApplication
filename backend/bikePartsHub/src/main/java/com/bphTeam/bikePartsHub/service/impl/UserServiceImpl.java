package com.bphTeam.bikePartsHub.service.impl;

import com.bphTeam.bikePartsHub.dto.response.OrderResponseDto;
import com.bphTeam.bikePartsHub.dto.response.UserResponseDto;
import com.bphTeam.bikePartsHub.entity.Order;
import com.bphTeam.bikePartsHub.mapper.OrderMapper;
import com.bphTeam.bikePartsHub.repository.OrderRepo;
import com.bphTeam.bikePartsHub.service.UserService;
import com.bphTeam.bikePartsHub.user.User;
import com.bphTeam.bikePartsHub.user.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
                .role(user.getRole())
                .orders(orderResponseDtos)
                .build();
        return userResponseDto;
    }
}
