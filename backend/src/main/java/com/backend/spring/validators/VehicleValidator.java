package com.backend.spring.validators;

import com.backend.spring.entities.Vehicle;
import com.backend.spring.exceptions.ViolatedConstraintException;

import java.util.Calendar;

public class VehicleValidator implements Validator {
    private final Vehicle vehicle;

    public VehicleValidator(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    @Override
    public void validate() {
        validateVehicleLicensePlate();
        validateVehicleMake();
        validateVehicleModel();
        validateVehicleYear();
        validateVehicleVin();
    }

    private void validateVehicleYear() {
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        int vehicleYear = this.vehicle.getYear();

        if (vehicleYear > currentYear + 1)
            throw new ViolatedConstraintException("Vehicle year cannot be greater than " + (currentYear + 1));
    }

    private void validateVehicleMake() {
        String vehicleMake = this.vehicle.getMake();

        if (vehicleMake == null || vehicleMake.length() == 0)
            throw new ViolatedConstraintException("Vehicle make must be provided.");

        if (vehicleMake.length() > 20)
            throw new ViolatedConstraintException("Vehicle make must be at most 20 characters.");

        if (!vehicleMake.matches("^[a-zA-Z]+$"))
            throw new ViolatedConstraintException("Vehicle make must only contain letters.");
    }

    private void validateVehicleModel() {
        String vehicleModel = this.vehicle.getModel();

        if (vehicleModel == null || vehicleModel.length() == 0)
            throw new ViolatedConstraintException("Vehicle model must be provided.");

        if (vehicleModel.length() > 20)
            throw new ViolatedConstraintException("Vehicle model must be at most 20 characters.");

        if (!vehicleModel.matches("^[a-zA-Z]+$"))
            throw new ViolatedConstraintException("Vehicle model must only contain letters.");
    }

    private void validateVehicleLicensePlate() {
        String vehicleLicensePlate = this.vehicle.getPlate();

        if (vehicleLicensePlate == null || vehicleLicensePlate.length() == 0)
            throw new ViolatedConstraintException("Vehicle license plate must be provided.");

        if (vehicleLicensePlate.length() > 20)
            throw new ViolatedConstraintException("Vehicle license plate must be at most 20 characters.");

        if (!vehicleLicensePlate.matches("^[a-zA-Z0-9]+$"))
            throw new ViolatedConstraintException("Vehicle license plate must only contain letters and numbers.");
    }

    private void validateVehicleVin() {
        String vehicleVin = this.vehicle.getVin();

        if (vehicleVin == null || vehicleVin.length() == 0)
            throw new ViolatedConstraintException("Vehicle VIN must be provided.");

        if (vehicleVin.length() != 17)
            throw new ViolatedConstraintException("Vehicle VIN must be 17 characters.");

        if (!vehicleVin.matches("^[a-zA-Z0-9]+$"))
            throw new ViolatedConstraintException("Vehicle VIN must only contain letters and numbers.");
    }
}
