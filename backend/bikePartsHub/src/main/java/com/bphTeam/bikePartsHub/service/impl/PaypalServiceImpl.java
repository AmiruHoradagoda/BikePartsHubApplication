package com.bphTeam.bikePartsHub.service.impl;

import com.bphTeam.bikePartsHub.dto.request.paymentRequestDto.PaypalCreatePaymentRequestDto;
import com.bphTeam.bikePartsHub.dto.request.paymentRequestDto.PaypalExecutePaymentRequestDto;
import com.bphTeam.bikePartsHub.dto.response.paymentResponseDto.PaypalCreatePaymentResponseDto;
import com.bphTeam.bikePartsHub.dto.response.paymentResponseDto.PaypalExecutePaymentResponseDto;
import com.bphTeam.bikePartsHub.exception.BadRequestException;
import com.bphTeam.bikePartsHub.service.PaypalService;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaypalServiceImpl implements PaypalService {
    private static final String PAYPAL_METHOD = "paypal";
    private static final String SALE_INTENT = "sale";
    private static final String APPROVAL_URL_REL = "approval_url";

    private final APIContext apiContext;

    @Override
    public PaypalCreatePaymentResponseDto createPayment(PaypalCreatePaymentRequestDto request) {
        validateCreatePaymentRequest(request);

        Amount amount = new Amount();
        amount.setCurrency(request.getCurrency().toUpperCase());
        amount.setTotal(formatAmount(request.getTotal()));

        Transaction transaction = new Transaction();
        transaction.setDescription(request.getDescription());
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(PAYPAL_METHOD);

        Payment payment = new Payment();
        payment.setIntent(SALE_INTENT);
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(request.getCancelUrl());
        redirectUrls.setReturnUrl(request.getSuccessUrl());
        payment.setRedirectUrls(redirectUrls);

        try {
            Payment createdPayment = payment.create(apiContext);
            return PaypalCreatePaymentResponseDto.builder()
                    .paymentId(createdPayment.getId())
                    .state(createdPayment.getState())
                    .approvalUrl(extractApprovalUrl(createdPayment))
                    .build();
        } catch (PayPalRESTException ex) {
            throw new BadRequestException("PayPal payment creation failed: " + ex.getMessage());
        }
    }

    @Override
    public PaypalExecutePaymentResponseDto executePayment(PaypalExecutePaymentRequestDto request) {
        validateExecutePaymentRequest(request);

        Payment payment = new Payment();
        payment.setId(request.getPaymentId());

        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(request.getPayerId());

        try {
            Payment executedPayment = payment.execute(apiContext, paymentExecution);
            return PaypalExecutePaymentResponseDto.builder()
                    .paymentId(executedPayment.getId())
                    .state(executedPayment.getState())
                    .payerStatus(
                            executedPayment.getPayer() != null
                                    ? executedPayment.getPayer().getStatus()
                                    : null
                    )
                    .build();
        } catch (PayPalRESTException ex) {
            throw new BadRequestException("PayPal payment execution failed: " + ex.getMessage());
        }
    }

    private String extractApprovalUrl(Payment payment) {
        if (payment.getLinks() == null) {
            throw new BadRequestException("PayPal did not return an approval URL");
        }

        return payment.getLinks()
                .stream()
                .filter(link -> APPROVAL_URL_REL.equalsIgnoreCase(link.getRel()))
                .map(Links::getHref)
                .findFirst()
                .orElseThrow(() -> new BadRequestException("PayPal did not return an approval URL"));
    }

    private String formatAmount(BigDecimal total) {
        return total.setScale(2, RoundingMode.HALF_UP).toPlainString();
    }

    private void validateCreatePaymentRequest(PaypalCreatePaymentRequestDto request) {
        if (request == null) {
            throw new BadRequestException("Payment request is required");
        }
        if (request.getTotal() == null || request.getTotal().compareTo(BigDecimal.ZERO) <= 0) {
            throw new BadRequestException("Payment total must be greater than zero");
        }
        if (isBlank(request.getCurrency())) {
            throw new BadRequestException("Payment currency is required");
        }
        if (isBlank(request.getCancelUrl())) {
            throw new BadRequestException("PayPal cancel URL is required");
        }
        if (isBlank(request.getSuccessUrl())) {
            throw new BadRequestException("PayPal success URL is required");
        }
    }

    private void validateExecutePaymentRequest(PaypalExecutePaymentRequestDto request) {
        if (request == null) {
            throw new BadRequestException("Payment execution request is required");
        }
        if (isBlank(request.getPaymentId())) {
            throw new BadRequestException("PayPal paymentId is required");
        }
        if (isBlank(request.getPayerId())) {
            throw new BadRequestException("PayPal payerId is required");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

}
