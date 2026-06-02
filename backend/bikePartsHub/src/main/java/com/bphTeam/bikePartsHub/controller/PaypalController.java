package com.bphTeam.bikePartsHub.controller;

import ch.qos.logback.core.model.Model;
import com.bphTeam.bikePartsHub.service.PaypalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class PaypalController {

    private final PaypalService paypalService;

    @GetMapping("/")
    public String home(Model model) {

    }

    @PostMapping("/")
    public String home(Model model) {

    }
}
