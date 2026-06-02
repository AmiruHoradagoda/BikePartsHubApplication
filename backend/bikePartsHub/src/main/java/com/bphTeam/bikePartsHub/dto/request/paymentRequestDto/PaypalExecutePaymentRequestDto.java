package com.bphTeam.bikePartsHub.dto.request.paymentRequestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaypalExecutePaymentRequestDto {
    private String paymentId;
    private String payerId;
}
