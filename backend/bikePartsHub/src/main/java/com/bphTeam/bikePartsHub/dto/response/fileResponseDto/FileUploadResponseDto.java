package com.bphTeam.bikePartsHub.dto.response.fileResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class FileUploadResponseDto {
    private String fileName;
    private String objectKey;
    private String url;
}
