package com.backend.spring.user.shopowner;

import com.backend.spring.shop.Shop;
import com.backend.spring.user.appuser.AppUser;
import lombok.AllArgsConstructor;

import javax.persistence.OneToOne;

import static javax.persistence.FetchType.EAGER;

@AllArgsConstructor
public class ShopOwner extends AppUser {
    @OneToOne(mappedBy = "shopOwner", fetch = EAGER, optional = false)
    private final Shop shop;
}
