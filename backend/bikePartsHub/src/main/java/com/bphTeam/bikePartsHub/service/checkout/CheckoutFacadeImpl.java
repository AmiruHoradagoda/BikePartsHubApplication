package com.bphTeam.bikePartsHub.service.checkout;

import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderDetailRequestDto;
import com.bphTeam.bikePartsHub.dto.request.orderRequestDto.OrderSaveRequestDto;
import com.bphTeam.bikePartsHub.entity.Order;
import com.bphTeam.bikePartsHub.entity.OrderDetails;
import com.bphTeam.bikePartsHub.entity.ShippingAddress;
import com.bphTeam.bikePartsHub.entity.User;
import com.bphTeam.bikePartsHub.entity.enums.OrderStatus;
import com.bphTeam.bikePartsHub.entity.enums.PaymentMethod;
import com.bphTeam.bikePartsHub.exception.EntryNotFoundException;
import com.bphTeam.bikePartsHub.mapper.ShippingMapper;
import com.bphTeam.bikePartsHub.repository.OrderDetailRepo;
import com.bphTeam.bikePartsHub.repository.OrderRepo;
import com.bphTeam.bikePartsHub.repository.PaymentRepository;
import com.bphTeam.bikePartsHub.repository.ProductRepo;
import com.bphTeam.bikePartsHub.repository.ShippingRepo;
import com.bphTeam.bikePartsHub.repository.UserRepo;
import com.bphTeam.bikePartsHub.service.checkout.CheckoutFacade;
import com.bphTeam.bikePartsHub.service.payment.strategy.PaymentStrategyFactory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CheckoutFacadeImpl implements CheckoutFacade {

    private final UserRepo userRepo;
    private final OrderRepo orderRepo;
    private final OrderDetailRepo orderDetailRepo;
    private final ProductRepo productRepo;
    private final ShippingRepo shippingRepo;
    private final PaymentRepository paymentRepository;
    private final ShippingMapper shippingMapper;
    private final PaymentStrategyFactory paymentStrategyFactory;

    @Transactional
    @Override
    public String placeOrder(OrderSaveRequestDto orderRequest) {
        User user = findUser(orderRequest.getUserId());
        ShippingAddress shippingAddress = saveShippingAddress(orderRequest);
        Order order = saveOrder(orderRequest, user, shippingAddress);
        saveOrderDetails(orderRequest, order);
        savePayment(orderRequest, order);
        return "Order saved";
    }

    private User findUser(Integer userId) {
        return userRepo.findById(userId)
                .orElseThrow(() -> new EntryNotFoundException("User not found with id: " + userId));
    }

    private ShippingAddress saveShippingAddress(OrderSaveRequestDto orderRequest) {
        ShippingAddress shippingAddress = shippingMapper.toShippingEntity(orderRequest.getShippingAddress());
        return shippingRepo.save(shippingAddress);
    }

    private Order saveOrder(OrderSaveRequestDto orderRequest, User user, ShippingAddress shippingAddress) {
        Order order = new Order();
        order.setUser(user);
        order.setDate(orderRequest.getOrderDate());
        order.setTotal(orderRequest.getTotal());
        order.setShippingAddress(shippingAddress);
        order.setStatus(OrderStatus.PENDING);
        return orderRepo.save(order);
    }

    private void saveOrderDetails(OrderSaveRequestDto orderRequest, Order order) {
        for (OrderDetailRequestDto detailRequest : orderRequest.getOrderDetails()) {
            OrderDetails orderDetail = new OrderDetails();
            orderDetail.setOrders(order);
            orderDetail.setProductName(detailRequest.getProductName());
            orderDetail.setQty(detailRequest.getQty());
            orderDetail.setAmount(detailRequest.getAmount());
            orderDetail.setProduct(productRepo.findById(detailRequest.getProductId())
                    .orElseThrow(() -> new EntryNotFoundException("Product not found with id: "
                            + detailRequest.getProductId())));

            orderDetailRepo.save(orderDetail);
        }
    }

    private void savePayment(OrderSaveRequestDto orderRequest, Order order) {
        PaymentMethod paymentMethod = orderRequest.getPayment() != null
                && orderRequest.getPayment().getMethod() != null
                ? orderRequest.getPayment().getMethod()
                : PaymentMethod.CASH_ON_DELIVERY;

        paymentRepository.save(paymentStrategyFactory
                .getStrategy(paymentMethod)
                .createPayment(order, orderRequest));
    }
}
