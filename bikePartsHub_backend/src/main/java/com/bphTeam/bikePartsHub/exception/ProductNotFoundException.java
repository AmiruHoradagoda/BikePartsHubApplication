package com.bphTeam.bikePartsHub.exception;

public class ProductNotFoundException extends EntryNotFoundException {

    private static final long serialVersionUID = 1L;

    public ProductNotFoundException(String message) {
        super(message);
    }
}
