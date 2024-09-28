package com.bphTeam.bikePartsHub.service.impl;

import com.bphTeam.bikePartsHub.dto.request.userRequestDto.UserSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.request.userRequestDto.UserUpdateRequestDto;
import com.bphTeam.bikePartsHub.dto.response.UserResponseDto;
import com.bphTeam.bikePartsHub.entity.User;
import com.bphTeam.bikePartsHub.repository.UserRepo;
import com.bphTeam.bikePartsHub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepository;

    @Override
    public String addUser(UserSaveRequestDto userDto) {
        User user = new User();
        user.setUserName(userDto.getUserName());
        user.setEmail(userDto.getEmail());
        user.setUserRole(userDto.getUserRole());
        user.setMobileNumber(userDto.getMobileNumber());

        userRepository.save(user);
        return "User successfully added!";
    }

    @Override
    public UserResponseDto getUserById(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        UserResponseDto userDto = new UserResponseDto();
        userDto.setUserId(user.getUserId());
        userDto.setUserName(user.getUserName());
        userDto.setEmail(user.getEmail());
        userDto.setUserRole(user.getUserRole());
        userDto.setMobileNumber(user.getMobileNumber());
        return userDto;
    }

    @Override
    public List<UserResponseDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserResponseDto> userDtos = new ArrayList<>();
        for (User user : users) {
            UserResponseDto dto = new UserResponseDto();
            dto.setUserId(user.getUserId());
            dto.setUserName(user.getUserName());
            dto.setEmail(user.getEmail());
            dto.setUserRole(user.getUserRole());
            dto.setMobileNumber(user.getMobileNumber());
            userDtos.add(dto);
        }
        return userDtos;
    }

    @Override
    public String updateUser(long userId, UserUpdateRequestDto userDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        user.setUserName(userDto.getUserName());
        user.setEmail(userDto.getEmail());
        user.setUserRole(userDto.getUserRole());
        user.setMobileNumber(userDto.getMobileNumber());

        userRepository.save(user);
        return "User successfully updated!";
    }

    @Override
    public String deleteUser(long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return "User successfully deleted!";
        } else {
            throw new RuntimeException("User not found with id: " + userId);
        }
    }
}

