package com.backend.spring.user.vehicleowner;

import com.backend.spring.user.role.Role;
import com.backend.spring.user.role.RoleEnum;
import com.backend.spring.user.role.RoleRepository;
import com.backend.spring.vehicle.Vehicle;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class VehicleOwnerTest {

    @Autowired
    private VehicleOwnerSaveHelper saveHelper;

    @Autowired
    private VehicleOwnerRepository vehicleOwnerRepository;

    private VehicleOwner vehicleOwner;

    private Vehicle vehicle;

    @Autowired
    private RoleRepository roleRepository;

    @BeforeEach
    void setUp() {
        roleRepository.save(new Role(RoleEnum.VEHICLE_OWNER));

        vehicleOwner = new VehicleOwner("bob", "jack", "bob3@gmail.com", "416-423-1423", "jack2", "pass");
        vehicleOwner.addRole(roleRepository.findByName(RoleEnum.VEHICLE_OWNER.getValue()));

        vehicle = new Vehicle(2022, "Honda", "Civic", "123456VIN", "ABC1234");

        vehicleOwner = vehicleOwnerRepository.save(vehicleOwner);

    }

    @AfterEach
    void tearDown() {
        vehicleOwnerRepository.deleteAll();
        roleRepository.deleteAll();
    }

    @Test
    void checkVehicleOwnerSaved() {
        assertThat(vehicleOwnerRepository.save(vehicleOwner).getUsername()).isEqualTo(vehicleOwner.getUsername());
    }

    @Test
    void checkOwnerHasVehicle() {
        assertThat(vehicleOwner.getVehicle()).isNotNull();
    }
}