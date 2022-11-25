package com.backend.spring.validators;

import com.backend.spring.entities.ShopOwner;

public class ShopOwnerValidator implements Validator {

    private final ShopOwner shopOwner;

    public ShopOwnerValidator(ShopOwner shopOwner) {
        this.shopOwner = shopOwner;
    }

    @Override
    public void validate() {
        validateUserInfo();
        validateShop();
    }

    private void validateUserInfo() {
        new AppUserValidator(shopOwner).validate();
    }

    private void validateShop() {
        new ShopValidator(shopOwner.getShop()).validate();
    }
}
