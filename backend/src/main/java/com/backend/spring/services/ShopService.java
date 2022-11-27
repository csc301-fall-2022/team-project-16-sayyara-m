package com.backend.spring.services;

import com.backend.spring.entities.Service;
import com.backend.spring.entities.Shop;
import com.backend.spring.exceptions.DataNotFoundException;
import com.backend.spring.exceptions.InvalidDataException;
import com.backend.spring.repositories.ShopRepository;
import lombok.RequiredArgsConstructor;

import javax.transaction.Transactional;
import java.util.List;

@org.springframework.stereotype.Service
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

    public void addService(String authHeader, Service service) { // TODO Jamie: does Shop automatically get updated in the DB?
        Shop shop = shopOwnerRetriever.getShop(authHeader);
        service.setShop(shop);
        List<Service> services = shop.getServices();
        services.add(service);
        shop.setServices(services);
        shopRepository.save(shop);
    }

    public void removeService(String authHeader, long id) { // TODO Jamie: does Shop automatically get updated in the DB?
        Shop shop = shopOwnerRetriever.getShop(authHeader);
        List<Service> services = shop.getServices();
        services.removeIf(service -> service.getId() == id);
        shop.setServices(services);
        shopRepository.save(shop);
    }
}
