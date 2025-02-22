package com.bphTeam.bikePartsHub.repository;


import com.bphTeam.bikePartsHub.dto.response.productResponseDto.ProductSearchResponseDto;
import com.bphTeam.bikePartsHub.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    Page<Product> findAllByActiveStateEquals(boolean activeState, Pageable pageable);

    int countAllByActiveStateEquals(boolean activeState);

    @Query("SELECT new com.bphTeam.bikePartsHub.dto.response.productResponseDto.ProductSearchResponseDto(p.productId,p.productName, p.manufacture, p.imageUrl) " +
            "FROM Product p " +
            "WHERE (:productName IS NULL OR p.productName LIKE %:productName%) " +
            "AND p.activeState = :activeState")
    Page<ProductSearchResponseDto> findProductsByNameAndActiveState(
            @Param("productName") String productName,
            @Param("activeState") boolean activeState,
            Pageable pageable);

}