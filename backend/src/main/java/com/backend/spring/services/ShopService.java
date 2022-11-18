package com.backend.spring.services;

import com.backend.spring.entities.Shop;
import com.backend.spring.exceptions.InvalidDataException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class ShopService {
    private final ShopOwnerRetriever shopOwnerRetriever;

    @Transactional
    public Shop updateShop(Shop newShop, String authorization) throws InvalidDataException {
        Shop shop = shopOwnerRetriever.getShop(authorization);
        shop.update(newShop);
        return shop;
    }
}
