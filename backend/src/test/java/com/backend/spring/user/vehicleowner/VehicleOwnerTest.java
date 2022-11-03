package com.backend.spring.user.vehicleowner;

import com.backend.spring.user.role.RoleRepository;
import com.backend.spring.vehicle.Vehicle;
import com.backend.spring.vehicle.VehicleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class VehicleOwnerTest {

    private VehicleOwnerSaveHelper saveHelper;

    @Autowired
    private VehicleOwnerRepository vehicleOwnerRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private TestEntityManager entityManager;

    private VehicleOwner vehicleOwner;

    private Vehicle vehicle;

    @BeforeEach
    void setUp() {
        saveHelper = new VehicleOwnerSaveHelper(vehicleOwnerRepository, vehicleRepository, roleRepository);

        vehicleOwner = new VehicleOwner("bob", "jack", "bob3@gmail.com", "416-423-1423", "jack", "pass");

        vehicle = new Vehicle(2022, "Honda", "Civic", "123456VIN", "ABC1234");

        vehicleOwner = saveHelper.saveAndFlush(vehicleOwner, vehicle);

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