package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.request.paymentRequestDto.PaypalCreatePaymentRequestDto;
import com.bphTeam.bikePartsHub.dto.request.paymentRequestDto.PaypalExecutePaymentRequestDto;
import com.bphTeam.bikePartsHub.dto.response.paymentResponseDto.PaypalCreatePaymentResponseDto;
import com.bphTeam.bikePartsHub.dto.response.paymentResponseDto.PaypalExecutePaymentResponseDto;

public interface PaypalService {

    PaypalCreatePaymentResponseDto createPayment(PaypalCreatePaymentRequestDto request);

    PaypalExecutePaymentResponseDto executePayment(PaypalExecutePaymentRequestDto request);
}
