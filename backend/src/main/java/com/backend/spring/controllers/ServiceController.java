package com.backend.spring.controllers;

import com.backend.spring.entities.Service;
import com.backend.spring.exceptions.DataNotFoundException;
import com.backend.spring.services.ServiceService;
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
@RequestMapping(path = "services")
public class ServiceController {
    private final ServiceService serviceService;

    @Autowired
    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping
    public List<Service> getAllServices() {
        return serviceService.getAllServices();
    }

    @GetMapping(path = "{service_id}")
    public Service getService(@PathVariable("service_id") long id) throws DataNotFoundException {
        return serviceService.getService(id);
    }

    @PostMapping
    public Service createService(@RequestBody Service service) {
        return serviceService.createService(service);
    }

    @DeleteMapping(path = "{service_id}")
    public void deleteService(@PathVariable("service_id") long id) {
        serviceService.deleteService(id);
    }

    @PutMapping(path = "{service_id}")
    public void updateService(@PathVariable("service_id") Long id,
                              @RequestParam(required = false) String name,
                              @RequestParam(required = false) Double defaultPrice) {
        serviceService.updateService(id, name, defaultPrice);
    }
}
