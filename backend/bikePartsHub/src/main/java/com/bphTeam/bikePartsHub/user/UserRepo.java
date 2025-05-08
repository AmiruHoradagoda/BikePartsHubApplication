package com.bphTeam.bikePartsHub.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE (:customerName IS NULL OR u.firstName LIKE %:customerName% OR u.lastName LIKE %:customerName%) AND (:role IS NULL OR u.role = :role) AND u.role IN (:roles)")
    Page<User> getAllCustomers(
            @Param("customerName") String customerName,
            @Param("role") Role role,
            @Param("roles") Set<Role> roles,
            Pageable pageable
    );
}
