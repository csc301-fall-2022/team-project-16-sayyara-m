package com.backend.spring.services;

import com.backend.spring.entities.Shop;
import com.backend.spring.entities.ShopOwner;
import com.backend.spring.exceptions.InvalidDataException;
import com.backend.spring.repositories.ShopOwnerRepository;
import com.backend.spring.security.AuthHeaderParser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * This class parses an authentication header and retrieves the shop owner object from it.
 */
@Service
@RequiredArgsConstructor
class ShopOwnerRetriever {

    private final ShopOwnerRepository shopOwnerRepository;

    ShopOwner getShopOwner(String authorization) throws InvalidDataException {
        String username = new AuthHeaderParser(authorization).getUsername();

        return shopOwnerRepository.findByUsername(username);
    }

    Shop getShop(String authorization) throws InvalidDataException {
        return getShopOwner(authorization).getShop();
    }
}
