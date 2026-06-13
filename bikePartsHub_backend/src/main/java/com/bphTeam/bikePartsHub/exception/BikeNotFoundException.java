package com.bphTeam.bikePartsHub.exception;

public class BikeNotFoundException extends EntryNotFoundException {

    private static final long serialVersionUID = 1L;

    public BikeNotFoundException(String message) {
        super(message);
    }
}
