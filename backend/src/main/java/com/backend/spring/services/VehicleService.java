package com.backend.spring.services;

import com.backend.spring.repositories.VehicleRepository;
import com.backend.spring.entities.VehicleOwner;
import com.backend.spring.entities.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class VehicleService {
    private final VehicleRepository repository;

    @Autowired
    public VehicleService(VehicleRepository repository) {
        this.repository = repository;
    }

    public List<Vehicle> getAllVehicles() {
        return repository.findAll();
    }

    public Vehicle getVehicle(long id) {
        return repository.findById(id).orElseThrow(IllegalStateException::new);
    }

    public Vehicle createVehicle(Vehicle vehicle) {
        return repository.save(vehicle);
    }

    public void deleteVehicle(long id) {
        repository.deleteById(id);
    }

    @Transactional
    public void updateVehicle(long id, VehicleOwner vehicleOwner, Integer year, String make, String model, String vin, String plate) {
        Vehicle vehicle = repository.findById(id).orElseThrow(IllegalStateException::new);

        if (vehicleOwner != null) {
            vehicle.setOwner(vehicleOwner);
        }

        if (year != null) {
            vehicle.setYear(year);
        }

        if (make != null) {
            vehicle.setMake(make);
        }

        if (model != null) {
            vehicle.setModel(model);
        }

        if (vin != null) {
            vehicle.setVin(vin);
        }

        if (plate != null) {
            vehicle.setPlate(plate);
        }
    }
}
