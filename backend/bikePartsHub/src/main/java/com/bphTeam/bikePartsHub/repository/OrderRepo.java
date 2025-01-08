package com.bphTeam.bikePartsHub.repository;

import com.bphTeam.bikePartsHub.entity.Order;
import com.bphTeam.bikePartsHub.user.User;
import com.bphTeam.bikePartsHub.utils.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
@EnableJpaRepositories
public interface OrderRepo extends JpaRepository<Order, Long> {
    Set<Order> findOrderByUser(User user);
    Page<Order> findAllByStatus(OrderStatus status, Pageable pageable);

}
