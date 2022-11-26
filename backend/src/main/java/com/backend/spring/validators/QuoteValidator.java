package com.backend.spring.validators;

import com.backend.spring.entities.Quote;
import com.backend.spring.exceptions.ViolatedConstraintException;

import java.time.LocalDateTime;

public class QuoteValidator implements Validator {
    private final Quote quote;

    public QuoteValidator(Quote quote) {
        this.quote = quote;
    }

    @Override
    public void validate() {
        validateVehicleOwner();
        validateService();
        validateExpiryDate();
        validatePrice();
    }

    private void validateService() {
        if (quote.getServiceName() == null || quote.getServiceName().length() == 0)
            throw new ViolatedConstraintException("Service name must be provided.");
    }

    private void validateVehicleOwner() {
        new VehicleOwnerValidator(quote.getVehicleOwner()).validate();
    }

    private void validateExpiryDate() {
        LocalDateTime currentDate = LocalDateTime.now();
        LocalDateTime expiryDate = quote.getExpiryDate();

        if (expiryDate.isBefore(currentDate))
            throw new ViolatedConstraintException("Quote expiry date must be after the current date.");
    }

    private void validatePrice() {
        Double price = this.quote.getPrice();

        if (price != null && price < 0)
            throw new ViolatedConstraintException("Quote price must be greater than or equal to 0.");
    }
}
