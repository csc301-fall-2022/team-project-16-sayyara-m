package com.backend.spring.services;

import com.backend.spring.entities.Service;
import com.backend.spring.exceptions.DataNotFoundException;
import com.backend.spring.repositories.ServiceRepository;
import lombok.RequiredArgsConstructor;

import javax.transaction.Transactional;
import java.util.List;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceService {
    private final ServiceRepository repository;

    public List<Service> getAllServices() {
        return repository.findAll();
    }

    public Service getService(long id) throws DataNotFoundException {
        return repository.findById(id).orElseThrow(() -> new DataNotFoundException("Service with id " + id + " doesn't exist"));
    }

    public Service createService(Service service) {
        return repository.save(service);
    }

    public void deleteService(long id) {
        repository.deleteById(id);
    }

    @Transactional
    public void updateService(long id, String name, Double defaultPrice) {
        Service service = repository.findById(id).orElseThrow(IllegalStateException::new);

        if (name != null) {
            service.setName(name);
        }

        if (defaultPrice != null) {
            service.setDefaultPrice(defaultPrice);
        }
    }
}
