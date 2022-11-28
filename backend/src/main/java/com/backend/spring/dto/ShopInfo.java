package com.backend.spring.dto;

import com.backend.spring.entities.Address;
import com.backend.spring.entities.Shop;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ShopInfo shopInfo)) return false;
        return Objects.equals(name, shopInfo.name) &&
                Objects.equals(address, shopInfo.address) &&
                Objects.equals(email, shopInfo.email) &&
                Objects.equals(phoneNumber, shopInfo.phoneNumber) || shopInfo.shopId.equals(shopId);
    }
}
