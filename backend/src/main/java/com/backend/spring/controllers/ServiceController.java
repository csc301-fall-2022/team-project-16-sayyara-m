package com.backend.spring.controllers;

import com.backend.spring.entities.Service;
import com.backend.spring.exceptions.DataNotFoundException;
import com.backend.spring.services.ServiceService;
import com.backend.spring.services.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@CrossOrigin
@RequestMapping(path = "services")
public class ServiceController {
    private final ServiceService serviceService;
    private final ShopService shopService;

    @Autowired
    public ServiceController(ServiceService serviceService, ShopService shopService) {
        this.serviceService = serviceService;
        this.shopService = shopService;
    }

    @GetMapping
    public ResponseEntity<List<Service>> getAllServices(@RequestHeader(AUTHORIZATION) String authHeader) {
        return ResponseEntity.ok(serviceService.getAllServicesFromShop(authHeader));
    }

    @GetMapping(path = "{service_id}")
    public Service getService(@PathVariable("service_id") long id) throws DataNotFoundException {
        return serviceService.getService(id);
    }

    @PostMapping
    public ResponseEntity<Service> createService(@RequestHeader(AUTHORIZATION) String authHeader,
                                                 @RequestParam("name") String name,
                                                 @RequestParam("default_price") double defaultPrice) throws URISyntaxException {
        Service service = serviceService.createService(new Service(name, defaultPrice));
        shopService.addService(authHeader, service);
        return ResponseEntity.created(new URI("/api/services/" + service.getId())).body(service);
    }

    @DeleteMapping(path = "{service_id}")
    public void deleteService(@RequestHeader(AUTHORIZATION) String authHeader,
                              @RequestParam("service_id") long serviceId) {
        // TODO Jamie: What if service to delete was used in existing appointments/quotes, retain in DB?
        // serviceService.deleteService(id);
        shopService.removeService(authHeader, serviceId);
    }

    @PutMapping(path = "{service_id}")
    public void updateService(@PathVariable("service_id") Long id,
                              @RequestParam(required = false) String name,
                              @RequestParam(required = false) Double defaultPrice) {
        serviceService.updateService(id, name, defaultPrice);
    }
}
