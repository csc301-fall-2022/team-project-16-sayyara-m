package com.backend.spring.services;

import com.backend.spring.entities.Shop;
import com.backend.spring.exceptions.DataNotFoundException;
import com.backend.spring.exceptions.InvalidDataException;
import com.backend.spring.repositories.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopService {
    private final ShopOwnerRetriever shopOwnerRetriever;

    private final ShopRepository shopRepository;

    @Transactional
    public Shop updateShop(Shop newShop, String authorization) throws InvalidDataException {
        Shop shop = shopOwnerRetriever.getShop(authorization);
        shop.update(newShop);
        return shop;
    }

    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    public Shop getShopById(Long shopId) {
        return shopRepository.findById(shopId).orElseThrow(() -> new DataNotFoundException("Shop with id " + shopId + " not found"));
    }
}
