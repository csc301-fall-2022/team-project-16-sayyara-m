package com.backend.spring.address;

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
@RequestMapping(path = "api/addresses")
public class AddressController {
    private final AddressService service;

    @Autowired
    public AddressController(AddressService service) {
        this.service = service;
    }

    @GetMapping
    public List<Address> getAllAddresses() {
        return service.getAllAddresses();
    }

    @GetMapping(path = "{address_id}")
    public Address getAddress(long id) {
        return service.getAddress(id);
    }

    @PostMapping
    public Address createAddress(@RequestBody Address address) {
        return service.createAddress(address);
    }

    @DeleteMapping(path = "{address_id}")
    public void deleteAddress(@PathVariable("address_id") long id) {
        service.deleteAddress(id);
    }

    @PutMapping(path = "{address_id}")
    public void updateAddress(@PathVariable("address_id") Long id,
                              @RequestParam(required = false) String streetNumber,
                              @RequestParam(required = false) String street,
                              @RequestParam(required = false) String city,
                              @RequestParam(required = false) String province,
                              @RequestParam(required = false) String postalCode) {
        service.updateAddress(id, streetNumber, street, city, province, postalCode);
    }
}
