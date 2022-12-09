package com.backend.spring.services;

import com.backend.spring.entities.Shop;
import com.backend.spring.entities.ShopOwner;
import com.backend.spring.exceptions.DataNotFoundException;
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

    /**
     * Parses the authentication header and retrieves the shop owner object from it.
     *
     * @param authorization Authorization header received from an HTTP request
     * @return Shop owner object associated with the username in the authorization header
     * @throws InvalidDataException If the authorization header is invalid
     */
    ShopOwner getShopOwner(String authorization) throws InvalidDataException {
        String username = new AuthHeaderParser(authorization).getUsername();

        return shopOwnerRepository.findByUsername(username).orElseThrow(() ->
                new DataNotFoundException("Shop Owner with username " + username + " not found"));
    }

    /**
     * Parses the authentication header and retrieves the shop object from it.
     *
     * @param authorization Authorization header received from an HTTP request
     * @return Shop object associated with the username in the authorization header
     * @throws InvalidDataException If the authorization header is invalid
     */
    Shop getShop(String authorization) throws InvalidDataException {
        return getShopOwner(authorization).getShop();
    }
}
