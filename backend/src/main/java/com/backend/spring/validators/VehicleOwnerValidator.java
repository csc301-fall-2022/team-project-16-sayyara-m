package com.backend.spring.validators;

import com.backend.spring.entities.VehicleOwner;

public class VehicleOwnerValidator implements Validator {

    private final UserInfoValidator userInfoValidator;

    private final VehicleValidator vehicleValidator;

    public VehicleOwnerValidator(VehicleOwner vehicleOwner) {
        this.userInfoValidator = new UserInfoValidator(vehicleOwner);
        this.vehicleValidator = new VehicleValidator(vehicleOwner.getVehicle());
    }

    @Override
    public void validate() {
        userInfoValidator.validate();
        vehicleValidator.validate();
    }
}
