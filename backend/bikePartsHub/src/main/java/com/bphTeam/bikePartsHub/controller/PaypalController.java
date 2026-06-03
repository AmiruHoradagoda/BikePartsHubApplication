package com.bphTeam.bikePartsHub.controller;

import com.bphTeam.bikePartsHub.dto.request.paymentRequestDto.PaypalCreatePaymentRequestDto;
import com.bphTeam.bikePartsHub.dto.request.paymentRequestDto.PaypalExecutePaymentRequestDto;
import com.bphTeam.bikePartsHub.dto.response.paymentResponseDto.PaypalCreatePaymentResponseDto;
import com.bphTeam.bikePartsHub.dto.response.paymentResponseDto.PaypalExecutePaymentResponseDto;
import com.bphTeam.bikePartsHub.service.payment.gateway.PaymentGateway;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/paypal")
@RequiredArgsConstructor
public class PaypalController {

    private final PaymentGateway paymentGateway;

    @PostMapping("/create-payment")
    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER', 'LOYAL_CUSTOMER')")
    public ResponseEntity<PaypalCreatePaymentResponseDto> createPayment(
            @RequestBody PaypalCreatePaymentRequestDto request
    ) {
        return ResponseEntity.ok(paymentGateway.createPayment(request));
    }

    @PostMapping("/execute-payment")
    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER', 'LOYAL_CUSTOMER')")
    public ResponseEntity<PaypalExecutePaymentResponseDto> executePayment(
            @RequestBody PaypalExecutePaymentRequestDto request
    ) {
        return ResponseEntity.ok(paymentGateway.executePayment(request));
    }
}
