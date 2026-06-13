package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.response.fileResponseDto.FileUploadResponseDto;
import com.bphTeam.bikePartsHub.service.storage.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
public class FileController {

    private final FileStorageService fileStorageService;

    @PostMapping(value = "/product-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FileUploadResponseDto> uploadProductImage(
            @RequestPart("file") MultipartFile file
    ) {
        return ResponseEntity.ok(fileStorageService.uploadProductImage(file));
    }
}
