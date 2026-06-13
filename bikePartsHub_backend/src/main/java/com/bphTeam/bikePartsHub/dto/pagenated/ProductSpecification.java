package com.bphTeam.bikePartsHub.dto.pagenated;

import com.bphTeam.bikePartsHub.entity.Bike;
import com.bphTeam.bikePartsHub.entity.Product;
import com.bphTeam.bikePartsHub.entity.ProductAttribute;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Join;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {

    public static Specification<Product> getProducts(boolean activeState, String category, String productType, String productManufacture, String bikeType, String bikeModel, String bikeManufacture, String color) {
        return (root, query, criteriaBuilder) -> {
            List<Specification<Product>> specifications = new ArrayList<>();

            specifications.add(activeStateSpecification(activeState));
            if (category != null) specifications.add(categorySpecification(category));
            if (productType != null) specifications.add(productTypeSpecification(productType));
            if (productManufacture != null) specifications.add(productManufactureSpecification(productManufacture));
            if (color != null || bikeType != null || bikeModel != null || bikeManufacture != null) {
                specifications.add(productAttributesSpecification(color, bikeType, bikeModel, bikeManufacture));
            }

            if (specifications.isEmpty()) {
                return criteriaBuilder.conjunction();
            }

            Specification<Product> result = specifications.get(0);
            for (Specification<Product> spec : specifications.subList(1, specifications.size())) {
                result = result.and(spec);
            }

            return result.toPredicate(root, query, criteriaBuilder);
        };
    }

    private static Specification<Product> activeStateSpecification(boolean activeState) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("activeState"), activeState);
    }

    private static Specification<Product> categorySpecification(String category) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("category"), category);
    }

    private static Specification<Product> productTypeSpecification(String productType) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("productType"), productType);
    }

    private static Specification<Product> productManufactureSpecification(String productManufacture) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("manufacture"), productManufacture);
    }

    private static Specification<Product> productAttributesSpecification(String color, String bikeType, String bikeModel, String bikeManufacture) {
        return (root, query, criteriaBuilder) -> {
            Join<Product, ProductAttribute> join = root.join("productAttributes");
            List<Specification<Product>> specifications = new ArrayList<>();

            if (color != null) {
                specifications.add((root1, query1, criteriaBuilder1) -> criteriaBuilder1.equal(join.get("color"), color));
            }

            Join<ProductAttribute, Bike> bikeJoin = join.join("bikes");
            if (bikeType != null) {
                specifications.add((root1, query1, criteriaBuilder1) -> criteriaBuilder1.equal(bikeJoin.get("type"), bikeType));
            }
            if (bikeModel != null) {
                specifications.add((root1, query1, criteriaBuilder1) -> criteriaBuilder1.equal(bikeJoin.get("model"), bikeModel));
            }
            if (bikeManufacture != null) {
                specifications.add((root1, query1, criteriaBuilder1) -> criteriaBuilder1.equal(bikeJoin.get("manufacture"), bikeManufacture));
            }

            if (specifications.isEmpty()) {
                return criteriaBuilder.conjunction();
            }

            Specification<Product> result = specifications.get(0);
            for (Specification<Product> spec : specifications.subList(1, specifications.size())) {
                result = result.and(spec);
            }

            return result.toPredicate(root, query, criteriaBuilder);
        };
    }
}
