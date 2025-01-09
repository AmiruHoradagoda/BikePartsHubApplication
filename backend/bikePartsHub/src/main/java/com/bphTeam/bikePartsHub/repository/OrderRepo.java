package com.bphTeam.bikePartsHub.repository;

import com.bphTeam.bikePartsHub.entity.Order;
import com.bphTeam.bikePartsHub.user.User;
import com.bphTeam.bikePartsHub.utils.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
@EnableJpaRepositories
public interface OrderRepo extends JpaRepository<Order, Long> {
    Set<Order> findOrderByUser(User user);
    @Query(value = "SELECT DISTINCT o FROM Order o " +
            "LEFT JOIN FETCH o.orderDetails " +
            "LEFT JOIN FETCH o.user " +
            "LEFT JOIN FETCH o.shippingAddress " +
            "WHERE o.status = :status",
            countQuery = "SELECT COUNT(o) FROM Order o WHERE o.status = :status")
    Page<Order> findAllByStatus(@Param("status") OrderStatus status, Pageable pageable);

    @Query(value = "SELECT DISTINCT o FROM Order o " +
            "LEFT JOIN FETCH o.orderDetails " +
            "LEFT JOIN FETCH o.user " +
            "LEFT JOIN FETCH o.shippingAddress",
            countQuery = "SELECT COUNT(o) FROM Order o")
    Page<Order> findAll(Pageable pageable);

}
