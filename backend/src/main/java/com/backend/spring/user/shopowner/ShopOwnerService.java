package com.backend.spring.user.shopowner;

import com.backend.spring.exceptions.InvalidDataException;
import com.backend.spring.shop.Shop;
import com.backend.spring.user.appuser.AppUser;
import com.backend.spring.user.security.AuthHeaderParser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShopOwnerService {
    private final ShopOwnerSaveHelper shopOwnerSaveHelper;

    private final ShopOwnerRepository shopOwnerRepository;

    public void saveShopOwner(ShopOwner shopOwner) {
        try {
            shopOwnerSaveHelper.save(shopOwner, shopOwner.getShop(), shopOwner.getShop().getAddress());
        } catch (IllegalStateException e) {
            System.out.println("Error at ShopOwnerService:saveShopOwner");
            System.out.println(e.getMessage());
            throw new InvalidDataException(e.getMessage());
        }
    }

    public ShopOwner getShopOwner(String authorization) {
        String username = new AuthHeaderParser(authorization).getUsername();

        return shopOwnerRepository.findByUsername(username);
    }

    public ShopOwner updateShopOwner(AppUser appUser, String authorization) {
        ShopOwner shopOwner = getShopOwner(authorization);
        shopOwner.updateUserInfo(appUser);
        return shopOwner;
    }

    public ShopOwner updateShop(Shop shop, String authorization) {
        ShopOwner shopOwner = getShopOwner(authorization);
        shopOwner.getShop().updateShop(shop);
        return shopOwner;
    }
}
