package com.bphTeam.bikePartsHub;

import com.bphTeam.bikePartsHub.auth.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties
@SpringBootApplication
public class BikePartsHubApplication implements CommandLineRunner {
	private final AuthenticationService authenticationService;

	public BikePartsHubApplication(AuthenticationService authenticationService) {
		this.authenticationService = authenticationService;
	}
	public static void main(String[] args) {
		SpringApplication.run(BikePartsHubApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
		authenticationService.initializeUser();
	}
}
