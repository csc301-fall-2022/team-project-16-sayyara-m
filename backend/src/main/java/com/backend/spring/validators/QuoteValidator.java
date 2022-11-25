package com.backend.spring.validators;

import com.backend.spring.entities.Quote;
import com.backend.spring.exceptions.ViolatedConstraintException;

import java.time.LocalDateTime;

public class QuoteValidator implements Validator {
    private final Quote quote;

    private final VehicleOwnerValidator vehicleOwnerValidator;

    private final ServiceValidator serviceValidator;

    public QuoteValidator(Quote quote) {
        this.quote = quote;
        this.vehicleOwnerValidator = new VehicleOwnerValidator(quote.getVehicleOwner());
        this.serviceValidator = new ServiceValidator(quote.getService());
    }

    @Override
    public void validate() {
        validateVehicleOwner();
        validateService();
        validateExpiryTime();
        validatePrice();
    }

    private void validateService() {
        serviceValidator.validate();
    }

    private void validateVehicleOwner() {
        vehicleOwnerValidator.validate();
    }

    private void validateExpiryTime() {
        LocalDateTime currentTime = LocalDateTime.now();
        LocalDateTime expiryTime = quote.getExpiryTime();

        if (expiryTime.isBefore(currentTime))
            throw new ViolatedConstraintException("Quote expiry time must be after the current time.");
    }

    private void validatePrice() {
        Double price = this.quote.getPrice();

        if (price != null && price < 0)
            throw new ViolatedConstraintException("Quote price must be greater than or equal to 0.");
    }
}