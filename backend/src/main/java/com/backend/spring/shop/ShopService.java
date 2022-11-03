package com.backend.spring.shop;

import com.backend.spring.address.Address;
import com.backend.spring.user.shopowner.ShopOwner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ShopService {
    private final ShopRepository repository;

    @Autowired
    public ShopService(ShopRepository repository) {
        this.repository = repository;
    }

    public List<Shop> getAllShops() {
        return repository.findAll();
    }

    public Shop getShop(long id) {
        return repository.findById(id).orElseThrow(IllegalStateException::new);
    }

    public Shop createShop(Shop shop) {
        return repository.save(shop);
    }

    public void deleteShop(long id) {
        repository.deleteById(id);
    }

    @Transactional
    public void updateShop(long id, ShopOwner shopOwner, Address address, String phoneNumber, String email) {
        Shop shop = repository.findById(id).orElseThrow(IllegalStateException::new);

        if (shopOwner != null) {
            shop.setShopOwner(shopOwner);
        }

        if (address != null) {
            shop.setAddress(address);
        }

        if (phoneNumber != null) {
            shop.setPhoneNumber(phoneNumber);
        }

        if (email != null) {
            shop.setEmail(email);
        }
    }
}
