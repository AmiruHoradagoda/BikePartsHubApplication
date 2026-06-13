package com.bphTeam.bikePartsHub.dto.request.paymentRequestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaypalCreatePaymentRequestDto {
    private BigDecimal total;
    private String currency;
    private String description;
    private String cancelUrl;
    private String successUrl;
}
