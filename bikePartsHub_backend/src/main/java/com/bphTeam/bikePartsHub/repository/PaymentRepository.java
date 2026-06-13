package com.bphTeam.bikePartsHub.repository;

import com.bphTeam.bikePartsHub.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
