package com.backend.spring.validators;

import com.backend.spring.entities.Appointment;
import com.backend.spring.exceptions.ViolatedConstraintException;

import java.time.LocalDateTime;

public class AppointmentValidator implements Validator {
    private final Appointment appointment;

    private final VehicleOwnerValidator vehicleOwnerValidator;

    private final ServiceValidator serviceValidator;

    private final QuoteValidator quoteValidator;

    public AppointmentValidator(Appointment appointment) {
        this.appointment = appointment;
        this.vehicleOwnerValidator = new VehicleOwnerValidator(appointment.getVehicleOwner());
        this.serviceValidator = new ServiceValidator(appointment.getService());
        this.quoteValidator = new QuoteValidator(appointment.getQuote());
    }

    @Override
    public void validate() {
        validateQuote();
        validateVehicleOwner();
        validateService();
        validateStartTime();
        validateEndTime();
    }

    private void validateQuote() {
        quoteValidator.validate();
    }

    private void validateService() {
        serviceValidator.validate();
    }

    private void validateVehicleOwner() {
        vehicleOwnerValidator.validate();
    }

    private void validateStartTime() {
        LocalDateTime currentTime = LocalDateTime.now();
        LocalDateTime startTime = appointment.getStartTime();

        if (startTime.isBefore(currentTime))
            throw new ViolatedConstraintException("Appointment start time must be after the current time.");
    }

    private void validateEndTime() {
        LocalDateTime endTime = appointment.getEndTime();
        LocalDateTime startTime = appointment.getStartTime();

        if (endTime.isBefore(startTime))
            throw new ViolatedConstraintException("Appointment end time must be after the start time.");
    }
}
