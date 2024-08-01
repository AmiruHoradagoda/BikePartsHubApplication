package com.bphTeam.bikePartsHub.repository;


import com.bphTeam.bikePartsHub.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product,Long>, JpaSpecificationExecutor<Product> {
    Page<Product> findAllByActiveStateEquals(boolean activeState, Specification<Product> products, Pageable pageable);

    int countAllByActiveStateEquals(boolean activeState);
}
