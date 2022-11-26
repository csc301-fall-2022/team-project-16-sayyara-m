package com.backend.spring.validators;

import com.backend.spring.entities.VehicleOwner;

public class VehicleOwnerValidator implements Validator {

    private final VehicleOwner vehicleOwner;

    public VehicleOwnerValidator(VehicleOwner vehicleOwner) {
        this.vehicleOwner = vehicleOwner;
    }

    @Override
    public void validate() {
        validateUserInfo();
        validateVehicle();
    }

    private void validateUserInfo() {
        new UserInfoValidator(vehicleOwner).validate();
    }

    private void validateVehicle() {
        new VehicleValidator(vehicleOwner.getVehicle()).validate();
    }
}
