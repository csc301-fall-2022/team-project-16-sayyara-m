package com.backend.spring.services;

import com.backend.spring.entities.VehicleOwner;
import com.backend.spring.exceptions.ViolatedConstraintException;
import com.backend.spring.repositories.VehicleOwnerRepository;
import com.backend.spring.validators.VehicleOwnerValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

/**
 * Helper class for Vehicle Owner that abstracts how it is being saved.
 * After taking the required repositories through the constructor, the `save()` method will use them
 * to save all objects passed in and make necessary assignments to fields.
 * <p>
 * For example, a vehicle owner needs to be assigned a vehicle, and this class will allow you to pass in
 * a vehicle owner and a vehicle and assign those values itself without you needing to assign them.
 * <p>
 * It will also set the appropriate role of the Vehicle Owner and encrypt the password.
 */
@Service
@RequiredArgsConstructor
public class VehicleOwnerSaveHelper {
    private final VehicleOwnerRepository vehicleOwnerRepository;

    /**
     * Saves a vehicle owner in the database as well as the vehicle assigned to it.
     * The appropriate role will be pulled from the database and assigned to this vehicle owner.
     * Also assigns the vehicle owner to the vehicle and the vehicle to the vehicle owner.
     *
     * @param vehicleOwner Vehicle Owner to save
     * @return Vehicle Owner after saving
     */
    public VehicleOwner save(@NonNull VehicleOwner vehicleOwner) throws ViolatedConstraintException {
        setVehicleOwner(vehicleOwner);
        return new SaveErrorTrapper().checkConstraintViolation(() -> vehicleOwnerRepository.save(vehicleOwner));
    }

    private void setVehicleOwner(VehicleOwner vehicleOwner) {
        vehicleOwner.getVehicle().setOwner(vehicleOwner);
    }
}
