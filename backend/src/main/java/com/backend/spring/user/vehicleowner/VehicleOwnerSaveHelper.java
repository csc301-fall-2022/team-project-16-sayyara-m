package com.backend.spring.user.vehicleowner;

import com.backend.spring.user.role.RoleEnum;
import com.backend.spring.user.role.RoleRepository;
import com.backend.spring.vehicle.Vehicle;
import com.backend.spring.vehicle.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;

/**
 * Helper class for Vehicle Owner that abstracts how it is being saved.
 * After taking the required repositories through the constructor, the `save()` method will use them
 * to save all objects passed in and make necessary assignments to fields.
 * <p>
 * For example, a vehicle owner needs to be assigned a vehicle, and this class will allow you to pass in
 * a vehicle owner and a vehicle and assign those values itself without you needing to assign them.
 * <p>
 * It will also set the appropriate role of the Vehicle Owner
 */
@RequiredArgsConstructor
public class VehicleOwnerSaveHelper {
    private final VehicleOwnerRepository vehicleOwnerRepository;

    private final VehicleRepository vehicleRepository;

    private final RoleRepository roleRepository;

    /**
     * Saves a vehicle owner in the database as well as the vehicle assigned to it.
     * The appropriate role will be pulled from the database and assigned to this vehicle owner.
     * Also assigns the vehicle owner to the vehicle and the vehicle to the vehicle owner.
     *
     * @param vehicleOwner Vehicle Owner to save
     * @param vehicle      Vehicle to be assigned to Vehicle Owner
     * @return Vehicle Owner after saving
     */
    public VehicleOwner save(@NonNull VehicleOwner vehicleOwner, @NonNull Vehicle vehicle) {
        vehicleOwner.setVehicle(vehicleRepository.save(vehicle));
        vehicle.setOwner(vehicleOwner);
        vehicleOwner.setRole(roleRepository.findByName(RoleEnum.VEHICLE_OWNER.getValue()));
        return vehicleOwnerRepository.save(vehicleOwner);
    }

    /**
     * Mainly used for testing.
     * <p>
     * Flushing allows for insertions to take place right away in the middle of a transaction, which allows
     * for easier testing of database constraint violations.
     */
    VehicleOwner saveAndFlush(@NonNull VehicleOwner vehicleOwner, @NonNull Vehicle vehicle) {
        vehicleOwner.setVehicle(vehicleRepository.save(vehicle));
        vehicle.setOwner(vehicleOwner);
        vehicleOwner.setRole(roleRepository.findByName(RoleEnum.VEHICLE_OWNER.getValue()));
        return vehicleOwnerRepository.saveAndFlush(vehicleOwner);
    }
}
