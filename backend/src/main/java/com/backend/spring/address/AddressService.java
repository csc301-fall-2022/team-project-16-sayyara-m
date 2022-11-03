package com.backend.spring.address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class AddressService {
    private final AddressRepository repository;

    @Autowired
    public AddressService(AddressRepository repository) {
        this.repository = repository;
    }

    public List<Address> getAllAddresses() {
        return repository.findAll();
    }

    public Address getAddress(long id) {
        return repository.findById(id).orElseThrow(IllegalStateException::new);
    }

    public Address createAddress(Address address) {
        return repository.save(address);
    }

    public void deleteAddress(long id) {
        repository.deleteById(id);
    }

    @Transactional
    public void updateAddress(long id, String streetNumber, String street, String city, String province, String postalCode) {
        Address address = repository.findById(id).orElseThrow(IllegalStateException::new);

        if (street != null) {
            address.setStreet(street);
        }

        if (streetNumber != null) {
            address.setStreetNumber(streetNumber);
        }

        if (postalCode != null) {
            address.setPostalCode(postalCode);
        }

        if (city != null) {
            address.setCity(city);
        }

        if (province != null) {
            address.setProvince(province);
        }

    }
}
