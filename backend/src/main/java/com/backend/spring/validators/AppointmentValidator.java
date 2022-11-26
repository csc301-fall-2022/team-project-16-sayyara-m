package com.backend.spring.validators;

import com.backend.spring.entities.Appointment;
import com.backend.spring.exceptions.ViolatedConstraintException;

import java.time.LocalDateTime;

public class AppointmentValidator implements Validator {
    private final Appointment appointment;

    public AppointmentValidator(Appointment appointment) {
        this.appointment = appointment;
    }

    @Override
    public void validate() {
        validateVehicleOwner();
        validateService();
        validateStartTime();
        validateEndTime();
    }

    private void validateService() {
        if (appointment.getServiceName() == null || appointment.getServiceName().length() == 0)
            throw new ViolatedConstraintException("Service name must be provided.");
    }

    private void validateVehicleOwner() {
        new VehicleOwnerValidator(appointment.getVehicleOwner()).validate();
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
