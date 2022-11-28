package com.backend.spring.validators;

import com.backend.spring.entities.Service;
import com.backend.spring.exceptions.ViolatedConstraintException;

public class ServiceValidator implements Validator {
    private final Service service;

    public ServiceValidator(Service service) {
        this.service = service;
    }

    @Override
    public void validate() {
        validateName();
        validatePrice();
    }

    private void validateName() {
        String name = this.service.getName();

        if (name == null || name.length() == 0)
            throw new ViolatedConstraintException("Service name must be provided.");

        if (name.length() > 20)
            throw new ViolatedConstraintException("Service name must be at most 20 characters.");
    }

    private void validatePrice() {
        Double price = this.service.getDefaultPrice();

        if (price != null && price < 0)
            throw new ViolatedConstraintException("Service price must be greater than or equal to 0.");
    }
}
