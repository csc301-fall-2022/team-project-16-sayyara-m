package com.backend.spring.user.vehicleowner;

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

    @BeforeEach
    void setUp() {
        vehicleOwner = new VehicleOwner("bob", "jack", "bob3@gmail.com", "416-423-1423", "jack2", "pass");

        vehicle = new Vehicle(2022, "Honda", "Civic", "123456VIN", "ABC1234");

        vehicleOwner = saveHelper.saveAndFlush(vehicleOwner, vehicle);

    }

    @AfterEach
    void tearDown() {
        vehicleOwnerRepository.deleteAll();
    }

    @Test
    void checkVehicleOwnerSaved() {
        assertThat(saveHelper.save(vehicleOwner, vehicle).toString()).isEqualTo(vehicleOwner.toString());
    }

    @Test
    void checkVehicleHasOwner() {
        assertThat(vehicle.getOwner()).isNotNull();
    }

    @Test
    void checkOwnerHasVehicle() {
        assertThat(vehicleOwner.getVehicle()).isNotNull();
    }
}