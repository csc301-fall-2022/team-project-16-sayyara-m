package com.backend.spring.controllers;

import com.backend.spring.entities.Service;
import com.backend.spring.exceptions.DataNotFoundException;
import com.backend.spring.services.ServiceService;
import com.backend.spring.services.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
@RequiredArgsConstructor
public class ServiceController {
    private final ServiceService serviceService;
    private final ShopService shopService;

    @GetMapping(path = "{service_id}")
    public Service getService(@PathVariable("service_id") long id) throws DataNotFoundException {
        return serviceService.getService(id);
    }

    @PostMapping
    public ResponseEntity<Service> createService(@RequestHeader(AUTHORIZATION) String authHeader,
                                                 @RequestBody Service service) throws URISyntaxException {

        Service createdService = serviceService.createService(service);
        shopService.addService(authHeader, createdService);
        return ResponseEntity.created(new URI("/api/services/" + createdService.getId())).body(createdService);
    }

    @DeleteMapping(path = "{service_id}")
    public void deleteService(@RequestHeader(AUTHORIZATION) String authHeader,
                              @PathVariable("service_id") long serviceId) {
        shopService.removeService(authHeader, serviceId);
        // TODO Jamie: What if service to delete was used in existing appointments/quotes, retain in DB?
        // serviceService.deleteService(id);
    }

    @PutMapping(path = "{service_id}")
    public void updateService(@PathVariable("service_id") Long id,
                              @RequestParam(required = false) String name,
                              @RequestParam(required = false) Double defaultPrice) {
        serviceService.updateService(id, name, defaultPrice);
    }
}
