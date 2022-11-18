package com.backend.spring.entities;

public enum RoleEnum {
    SHOP_OWNER("ROLE_SHOP_OWNER");

    private final String value;

    RoleEnum(String value) {
        this.value = value;
    }

    /**
     * Get the enum representing the string value passed in
     *
     * @param string string representing value of enum
     * @return enum value of string
     */
    public static RoleEnum fromString(String string) {
        for (RoleEnum roleEnum : RoleEnum.values()) {
            if (roleEnum.getValue().equals(string))
                return roleEnum;
        }
        return null;
    }

    public String getValue() {
        return value;
    }
}
