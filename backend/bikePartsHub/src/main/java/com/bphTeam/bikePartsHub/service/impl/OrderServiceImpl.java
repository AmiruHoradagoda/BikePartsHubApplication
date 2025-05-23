package com.bphTeam.bikePartsHub.service.impl;

import com.bphTeam.bikePartsHub.dto.pagenated.PaginatedOrderResponseWithDetailsDto;
import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderDetailRequestDto;
import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.response.orderResponseDto.OrderDetailsDto;
import com.bphTeam.bikePartsHub.dto.response.orderResponseDto.OrderResponseWithDetailsDto;
import com.bphTeam.bikePartsHub.entity.Order;
import com.bphTeam.bikePartsHub.entity.OrderDetails;
import com.bphTeam.bikePartsHub.entity.ShippingAddress;
import com.bphTeam.bikePartsHub.mapper.ShippingMapper;
import com.bphTeam.bikePartsHub.repository.OrderDetailRepo;
import com.bphTeam.bikePartsHub.repository.OrderRepo;
import com.bphTeam.bikePartsHub.repository.ProductRepo;
import com.bphTeam.bikePartsHub.repository.ShippingRepo;
import com.bphTeam.bikePartsHub.service.OrderService;
import com.bphTeam.bikePartsHub.user.User;
import com.bphTeam.bikePartsHub.user.UserRepo;
import com.bphTeam.bikePartsHub.utils.OrderStatus;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    @Autowired
    private ShippingMapper shippingMapper;
    @Autowired
    private ShippingRepo shippingRepo;

    @Transactional
    public String addOrder(OrderSaveRequestDto requestOrderSaveDTO) {
        // Retrieve the user by ID
        User user = userRepo.getById(requestOrderSaveDTO.getUserId());
        ShippingAddress shippingAddress = shippingMapper.toShippingEntity(requestOrderSaveDTO.getShippingAddress());
        shippingRepo.save(shippingAddress);
        // Create the Order entity
        Order order = new Order();
        order.setUser(user);
        order.setDate(requestOrderSaveDTO.getOrderDate());
        order.setTotal(requestOrderSaveDTO.getTotal());
        order.setShippingAddress(shippingAddress);
        order.setStatus(OrderStatus.PENDING);

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

    @Transactional
    @Override
    public PaginatedOrderResponseWithDetailsDto getAllOrderDetails(OrderStatus orderStatus, int page, int size) {
        // Create a Pageable object for pagination
        Pageable pageable = PageRequest.of(page, size);

        // Fetch paginated orders from the database
        Page<Order> ordersPage = orderStatus != null
                ? orderRepo.findAllByStatus(orderStatus, pageable)
                : orderRepo.findAll(pageable);

        // Initialize a set to store the OrderResponseWithDetailsDto
        Set<OrderResponseWithDetailsDto> orderResponseDtos = new HashSet<>();

        // Iterate through the orders
        for (Order order : ordersPage) {
            System.out.println("Order ID: " + order.getOrderId() + " Details size: " +
                    (order.getOrderDetails() != null ? order.getOrderDetails().size() : "null"));

            // Initialize a set to store the OrderDetailsDto
            Set<OrderDetailsDto> orderDetailsDtos = new HashSet<>();

            // Iterate through the order details
            if (order.getOrderDetails() != null) {
                for (OrderDetails orderDetail : order.getOrderDetails()) {
                    OrderDetailsDto orderDetailsDto = new OrderDetailsDto(
                            orderDetail.getOrderDetailId(),
                            orderDetail.getProductName(),
                            orderDetail.getQty(),
                            orderDetail.getProduct().getImageUrl(),
                            orderDetail.getAmount()
                    );
                    orderDetailsDtos.add(orderDetailsDto);
                }
            }

            // Create an OrderResponseWithDetailsDto for the current order
            OrderResponseWithDetailsDto orderResponseDto = new OrderResponseWithDetailsDto(
                    order.getOrderId(),
                    order.getUser().getFirstName(),
                    order.getUser().getLastName(),
                    order.getUser().getEmail(),
                    shippingMapper.toShippingAddressDto(order.getShippingAddress()),
                    order.getDate(),
                    order.getStatus(),
                    order.getTotal(),
                    orderDetailsDtos
            );

            // Add the OrderResponseWithDetailsDto to the set
            orderResponseDtos.add(orderResponseDto);
        }

        // Create and return the paginated response DTO
        return new PaginatedOrderResponseWithDetailsDto(orderResponseDtos, ordersPage.getTotalElements());
    }

    @Override
    public String changeOrderStatus(long orderId, OrderStatus status) {
        // Retrieve the order by ID
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order with ID " + orderId + " not found."));

        // Update the order's status
        order.setStatus(status);

        // Save the updated order
        orderRepo.save(order);

        // Return success message
        return "Order status changed to " + status + " for order ID " + orderId + ".";
    }

    @Override
    public PaginatedOrderResponseWithDetailsDto getCustomerOrders(Integer id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        // Fetch orders directly for the specific user with pagination
        Page<Order> ordersPage = orderRepo.findByUser_UserId(id, pageable);

        Set<OrderResponseWithDetailsDto> orderResponseDtos = new HashSet<>();

        for (Order order : ordersPage.getContent()) {
            Set<OrderDetailsDto> orderDetailsDtos = new HashSet<>();

            if (order.getOrderDetails() != null) {
                for (OrderDetails orderDetail : order.getOrderDetails()) {
                    OrderDetailsDto orderDetailsDto = new OrderDetailsDto(
                            orderDetail.getOrderDetailId(),
                            orderDetail.getProductName(),
                            orderDetail.getQty(),
                            orderDetail.getProduct().getImageUrl(),
                            orderDetail.getAmount()
                    );
                    orderDetailsDtos.add(orderDetailsDto);
                }
            }

            OrderResponseWithDetailsDto orderResponseDto = new OrderResponseWithDetailsDto(
                    order.getOrderId(),
                    order.getUser().getFirstName(),
                    order.getUser().getLastName(),
                    order.getUser().getEmail(),
                    shippingMapper.toShippingAddressDto(order.getShippingAddress()),
                    order.getDate(),
                    order.getStatus(),
                    order.getTotal(),
                    orderDetailsDtos
            );

            orderResponseDtos.add(orderResponseDto);
        }

        return new PaginatedOrderResponseWithDetailsDto(
                orderResponseDtos,
                ordersPage.getTotalElements()
        );
    }

    @Override
    public OrderResponseWithDetailsDto getOrderById(Long id) {
        // Retrieve the order by ID
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order with ID " + id + " not found."));

        // Initialize a set to store the OrderDetailsDto
        Set<OrderDetailsDto> orderDetailsDtos = new HashSet<>();

        // Iterate through the order details
        if (order.getOrderDetails() != null) {
            for (OrderDetails orderDetail : order.getOrderDetails()) {
                OrderDetailsDto orderDetailsDto = new OrderDetailsDto(
                        orderDetail.getOrderDetailId(),
                        orderDetail.getProductName(),
                        orderDetail.getQty(),
                        orderDetail.getProduct().getImageUrl(),
                        orderDetail.getAmount()
                );
                orderDetailsDtos.add(orderDetailsDto);
            }
        }

        // Create and return the OrderResponseWithDetailsDto
        return new OrderResponseWithDetailsDto(
                order.getOrderId(),
                order.getUser().getFirstName(),
                order.getUser().getLastName(),
                order.getUser().getEmail(),
                shippingMapper.toShippingAddressDto(order.getShippingAddress()),
                order.getDate(),
                order.getStatus(),
                order.getTotal(),
                orderDetailsDtos
        );
    }

    @Override
    public List<OrderResponseWithDetailsDto> getMonthlyOrderReport(int year, int month) {
        // Create start and end date for the month
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);

        // Convert to LocalDateTime objects
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(23, 59, 59);

        // Find orders within the date range
        List<Order> orders = orderRepo.findByDateBetween(startDateTime, endDateTime);

        // Rest of your code remains the same
        return orders.stream().map(order -> {
            // Initialize a set to store the OrderDetailsDto
            Set<OrderDetailsDto> orderDetailsDtos = new HashSet<>();

            // Iterate through the order details
            if (order.getOrderDetails() != null) {
                for (OrderDetails orderDetail : order.getOrderDetails()) {
                    OrderDetailsDto orderDetailsDto = new OrderDetailsDto(
                            orderDetail.getOrderDetailId(),
                            orderDetail.getProductName(),
                            orderDetail.getQty(),
                            orderDetail.getProduct().getImageUrl(),
                            orderDetail.getAmount()
                    );
                    orderDetailsDtos.add(orderDetailsDto);
                }
            }

            // Create and return the OrderResponseWithDetailsDto
            return new OrderResponseWithDetailsDto(
                    order.getOrderId(),
                    order.getUser().getFirstName(),
                    order.getUser().getLastName(),
                    order.getUser().getEmail(),
                    shippingMapper.toShippingAddressDto(order.getShippingAddress()),
                    order.getDate(),
                    order.getStatus(),
                    order.getTotal(),
                    orderDetailsDtos
            );
        }).collect(Collectors.toList());
    }
}


