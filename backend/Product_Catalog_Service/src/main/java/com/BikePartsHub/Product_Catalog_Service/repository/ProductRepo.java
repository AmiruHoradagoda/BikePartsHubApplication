package com.BikePartsHub.Product_Catalog_Service.repository;

import com.BikePartsHub.Product_Catalog_Service.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product,Long>, JpaSpecificationExecutor<Product> {
    Page<Product> findAllByActiveStateEquals(boolean activeState,Specification<Product> products, Pageable pageable);

    int countAllByActiveStateEquals(boolean activeState);
}
