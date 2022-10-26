package com.backend.spring.user.role;

public enum RoleEnum {
    SHOP_OWNER("ROLE_SHOP_OWNER"),
    VEHICLE_OWNER("ROLE_VEHICLE_OWNER");

    private final String value;

    RoleEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
