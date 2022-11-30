package com.backend.spring.validators;

import com.backend.spring.entities.Address;
import com.backend.spring.exceptions.ViolatedConstraintException;

class AddressValidator implements Validator {
    private final Address address;

    AddressValidator(Address address) {
        this.address = address;
    }

    @Override
    public void validate() {
        validateStreet();
        validateCity();
        validateProvince();
        validatePostalCode();
    }

    private void validateStreet() {
        String street = address.getStreet();

        if (street == null || street.isEmpty())
            throw new ViolatedConstraintException("Street must be provided.");
    }

    private void validateCity() {
        String city = address.getCity();

        if (city == null || city.isEmpty())
            throw new ViolatedConstraintException("City must be provided.");
    }

    private void validateProvince() {
        String province = address.getProvince();

        if (province == null || province.isEmpty())
            throw new ViolatedConstraintException("Province must be provided.");
    }

    private void validatePostalCode() {
        String postalCode = address.getPostalCode();

        if (postalCode == null || postalCode.isEmpty())
            throw new ViolatedConstraintException("Postal code must be provided.");

        postalCode = postalCode.replaceAll("\\s", "");
        address.setPostalCode(postalCode);

        if (!postalCode.matches("^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$"))
            throw new ViolatedConstraintException("Postal code must be in the form of A1A 1A1.");
    }
}
