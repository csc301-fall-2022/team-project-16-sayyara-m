package com.backend.spring.dto;

import com.backend.spring.entities.Address;
import com.backend.spring.entities.Shop;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ShopInfo {
    private Long shopId;
    private String name;
    private Address address;
    private String email;
    private String phoneNumber;

    public ShopInfo(Shop shop) {
        this.shopId = shop.getId();
        this.name = shop.getName();
        this.address = shop.getAddress();
        this.email = shop.getEmail();
        this.phoneNumber = shop.getPhoneNumber();
    }
}
