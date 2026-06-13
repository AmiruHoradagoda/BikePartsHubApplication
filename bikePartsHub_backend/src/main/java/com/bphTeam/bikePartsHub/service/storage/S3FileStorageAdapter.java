package com.bphTeam.bikePartsHub.service.storage;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.bphTeam.bikePartsHub.dto.response.fileResponseDto.FileUploadResponseDto;
import com.bphTeam.bikePartsHub.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Set;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class S3FileStorageAdapter implements FileStorageService {
    private static final Set<String> ALLOWED_IMAGE_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/webp"
    );

    private final AmazonS3 amazonS3;

    @Value("${s3bucket.bucket-name}")
    private String bucketName;

    @Override
    public FileUploadResponseDto uploadProductImage(MultipartFile file) {
        validateImage(file);

        String originalFileName = file.getOriginalFilename() == null
                ? "product-image"
                : file.getOriginalFilename();
        String objectKey = "products/" + UUID.randomUUID() + "-" + sanitizeFileName(originalFileName);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());

        try {
            amazonS3.putObject(new PutObjectRequest(bucketName, objectKey, file.getInputStream(), metadata));
            return FileUploadResponseDto.builder()
                    .fileName(originalFileName)
                    .objectKey(objectKey)
                    .url(amazonS3.getUrl(bucketName, objectKey).toString())
                    .build();
        } catch (IOException exception) {
            throw new BadRequestException("Could not read uploaded file");
        }
    }

    private void validateImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Image file is required");
        }
        if (!ALLOWED_IMAGE_TYPES.contains(file.getContentType())) {
            throw new BadRequestException("Only JPG, PNG, and WEBP images are allowed");
        }
    }

    private String sanitizeFileName(String fileName) {
        return fileName.replaceAll("[^a-zA-Z0-9._-]", "_");
    }
}
