package com.bphTeam.bikePartsHub.dto.request.orderRequestDto;

import com.bphTeam.bikePartsHub.entity.enums.PaymentMethod;
import com.bphTeam.bikePartsHub.entity.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaymentSaveRequestDto {
    private PaymentMethod method;
    private PaymentStatus status;
    private String transactionReference;
    private LocalDateTime paidAt;
}
