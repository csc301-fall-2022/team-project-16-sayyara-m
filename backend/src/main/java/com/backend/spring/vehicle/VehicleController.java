package com.backend.spring.vehicle;

import com.backend.spring.user.vehicleowner.VehicleOwner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/vehicles")
public class VehicleController {
    private final VehicleService service;

    @Autowired
    public VehicleController(VehicleService service) {
        this.service = service;
    }

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return service.getAllVehicles();
    }

    @GetMapping
    public Vehicle getVehicle(long id) {
        return service.getVehicle(id);
    }

    @PostMapping
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
        return service.createVehicle(vehicle);
    }

    @DeleteMapping(path = "{vehicle_id}")
    public void deleteVehicle(@PathVariable("vehicle_id") long id) {
        service.deleteVehicle(id);
    }

    @PutMapping(path = "{vehicle_id}")
    public void updateVehicle(@PathVariable("vehicle_id") Long id,
                              @RequestParam(required = false) VehicleOwner vehicleOwner,
                              @RequestParam(required = false) Integer year,
                              @RequestParam(required = false) String make,
                              @RequestParam(required = false) String model,
                              @RequestParam(required = false) String vin,
                              @RequestParam(required = false) String plate) {
        service.updateVehicle(id, vehicleOwner, year, make, model, vin, plate);
    }
}
