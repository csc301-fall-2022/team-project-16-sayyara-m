package com.backend.spring;

import com.backend.spring.User.ShopOwner;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.Period;

@Entity
@NoArgsConstructor
public class Shop {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn
    @Getter
    private ShopOwner shopOwner;

    @Getter
    private String address;
    @Getter
    private String phone;
    @Getter
    private String email;
    @Getter
    private Period hours;

    public Shop(long id, ShopOwner shopOwner, String address, String phone, String email, Period hours) {
        this.id = id;
        this.shopOwner = shopOwner;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.hours = hours;
    }
}
