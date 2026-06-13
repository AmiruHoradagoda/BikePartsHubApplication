package com.bphTeam.bikePartsHub.service.storage;

import com.bphTeam.bikePartsHub.dto.response.fileResponseDto.FileUploadResponseDto;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    FileUploadResponseDto uploadProductImage(MultipartFile file);
}
