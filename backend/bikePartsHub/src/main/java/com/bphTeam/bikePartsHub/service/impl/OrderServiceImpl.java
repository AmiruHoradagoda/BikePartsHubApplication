package com.bphTeam.bikePartsHub.service.impl;

import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderDetailRequestDto;
import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderSaveRequestDto;
import com.bphTeam.bikePartsHub.entity.Order;
import com.bphTeam.bikePartsHub.entity.OrderDetails;
import com.bphTeam.bikePartsHub.entity.User;
import com.bphTeam.bikePartsHub.repository.OrderDetailRepo;
import com.bphTeam.bikePartsHub.repository.OrderRepo;
import com.bphTeam.bikePartsHub.repository.ProductRepo;
import com.bphTeam.bikePartsHub.repository.UserRepo;
import com.bphTeam.bikePartsHub.service.OrderService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private OrderDetailRepo orderDetailRepo;
    @Autowired
    private ProductRepo productRepo;

    @Transactional
    public String addOrder(OrderSaveRequestDto requestOrderSaveDTO) {
        // Retrieve the user by ID
        User user = userRepo.getById(requestOrderSaveDTO.getUserId());

        // Create the Order entity
        Order order = new Order();
        order.setUser(user);
        order.setDate(requestOrderSaveDTO.getOrderDate());
        order.setTotal(requestOrderSaveDTO.getTotal());

        // Save the Order entity
        orderRepo.save(order);

        // Check if order was saved
        if (orderRepo.existsById(order.getOrderId())) {
            // Map OrderDetails DTOs to entity and set relationships
            for (OrderDetailRequestDto detailDTO : requestOrderSaveDTO.getOrderDetails()) {
                OrderDetails orderDetail = new OrderDetails();
                orderDetail.setOrders(order);
                orderDetail.setProductName(detailDTO.getProductName());
                orderDetail.setQty(detailDTO.getQty());
                orderDetail.setAmount(detailDTO.getAmount());
                orderDetail.setProduct(productRepo.getById(detailDTO.getProductId())); // Fetch item by productId

                // Save the order detail
                orderDetailRepo.save(orderDetail);
            }
            return "Order saved";
        }
        return "Order save failed";
    }
}


