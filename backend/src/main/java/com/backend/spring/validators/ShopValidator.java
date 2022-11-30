package com.backend.spring.validators;

import com.backend.spring.entities.Shop;
import com.backend.spring.exceptions.ViolatedConstraintException;

class ShopValidator implements Validator {
    private final Shop shop;

    ShopValidator(Shop shop) {
        this.shop = shop;
    }

    @Override
    public void validate() {
        validateName();
        validateAddress();
        validateEmail();
        validatePhoneNumber();
    }

    private void validateEmail() {
        String email = shop.getEmail();

        if (email == null || email.length() == 0)
            throw new ViolatedConstraintException("Shop email must be provided.");

        if (email.length() > 50)
            throw new ViolatedConstraintException("Shop email must be at most 50 characters.");
    }

    private void validatePhoneNumber() {
        if (shop.getPhoneNumber() == null || shop.getPhoneNumber().length() == 0)
            throw new ViolatedConstraintException("Shop phone number must be provided.");

        String phoneNumber = shop.getPhoneNumber().replaceAll("\\s", "").replaceAll("-", "");
        shop.setPhoneNumber(phoneNumber);

        if (phoneNumber.length() > 15)
            throw new ViolatedConstraintException("Shop phone number must be at most 15 characters.");

        if (!phoneNumber.matches("^\\+[0-9]{11}$"))
            throw new ViolatedConstraintException("Shop phone number must be in the form +14161239876.");
    }

    private void validateName() {
        String shopName = shop.getName();

        if (shopName == null || shopName.isEmpty()) {
            throw new ViolatedConstraintException("Shop name cannot be empty.");
        }
    }

    private void validateAddress() {
        new AddressValidator(shop.getAddress()).validate();
    }
}
