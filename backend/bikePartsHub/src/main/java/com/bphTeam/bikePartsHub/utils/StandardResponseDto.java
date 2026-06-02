package com.bphTeam.bikePartsHub.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StandardResponseDto {
    private int  code;
    private String message;
    private Object data;

}
