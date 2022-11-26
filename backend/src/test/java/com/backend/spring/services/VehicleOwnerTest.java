package com.backend.spring.services;

import com.backend.spring.entities.Vehicle;
import com.backend.spring.entities.VehicleOwner;
import com.backend.spring.repositories.VehicleOwnerRepository;
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

    @BeforeEach
    void setUp() {
        Vehicle vehicle = new Vehicle(2022, "Honda", "Civic", "1G1ZB5ST1GF285824", "ABC1234", "Bob Joe");

        vehicleOwner = new VehicleOwner("bob", "jack", "bob3@gmail.com", "416-423-1423", vehicle);

        vehicleOwner = saveHelper.save(vehicleOwner);
    }

    @AfterEach
    void tearDown() {
        vehicleOwnerRepository.deleteAll();
    }

    @Test
    void checkVehicleOwnerSaved() {
        assertThat(vehicleOwnerRepository.save(vehicleOwner).getEmail()).isEqualTo(vehicleOwner.getEmail());
    }

    @Test
    void checkOwnerHasVehicle() {
        assertThat(vehicleOwner.getVehicle()).isNotNull();
    }
}