package com.BikePartsHub.Product_Catalog_Service.dto.pagenated;


import com.BikePartsHub.Product_Catalog_Service.entity.Bike;
import com.BikePartsHub.Product_Catalog_Service.entity.Product;
import com.BikePartsHub.Product_Catalog_Service.entity.ProductAttribute;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;


import java.util.ArrayList;
import java.util.List;


public class ProductSpecification {

    public static Specification<Product> getProducts(boolean activeState, String category, String productType, String productManufacture, String bikeType, String bikeModel, String bikeManufacture, String color) {
        return (root, query, criteriaBuilder) -> {
            List<Specification<Product>> specifications = new ArrayList<>();

            // Filter by active state
            specifications.add((root1, query1, criteriaBuilder1) -> criteriaBuilder1.equal(root1.get("activeState"), activeState));

            // Filter by category
            if (category != null) {
                specifications.add((root1, query1, criteriaBuilder1) -> criteriaBuilder1.equal(root1.get("category"), category));
            }

            // Filter by product type
            if (productType != null) {
                specifications.add((root1, query1, criteriaBuilder1) -> criteriaBuilder1.equal(root1.get("productType"), productType));
            }

            // Filter by product manufacture
            if (productManufacture != null) {
                specifications.add((root1, query1, criteriaBuilder1) -> criteriaBuilder1.equal(root1.get("manufacture"), productManufacture));
            }

            // Join with productAttributes if any filtering by attributes or bikes is needed
            if (color != null || bikeType != null || bikeModel != null || bikeManufacture != null) {
                Join<Product, ProductAttribute> join = root.join("productAttributes");

                // Filter by color
                if (color != null) {
                    specifications.add((root1, query1, criteriaBuilder1) -> criteriaBuilder1.equal(join.get("color"), color));
                }

                // Filter by bike attributes
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
            }

            // Default specification that matches all if no criteria are provided
            if (specifications.isEmpty()) {
                return criteriaBuilder.conjunction(); // Return a predicate that always evaluates to true
            }

            // Combine all specifications into one
            Specification<Product> result = specifications.get(0);
            for (Specification<Product> spec : specifications.subList(1, specifications.size())) {
                result = result.and(spec);
            }

            return result.toPredicate(root, query, criteriaBuilder);
        };
    }
}
