package com.bphTeam.bikePartsHub.dto.response.paymentResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class PaypalCreatePaymentResponseDto {
    private String paymentId;
    private String state;
    private String approvalUrl;
}
