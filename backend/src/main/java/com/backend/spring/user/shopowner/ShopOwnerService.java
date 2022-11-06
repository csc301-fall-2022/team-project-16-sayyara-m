package com.backend.spring.user.shopowner;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShopOwnerService {
    private final ShopOwnerSaveHelper shopOwnerSaveHelper;

    public boolean saveShopOwner(ShopOwner shopOwner) {
        System.out.println(shopOwner);
        try {
            shopOwnerSaveHelper.save(shopOwner, shopOwner.getShop(), shopOwner.getShop().getAddress());
        } catch (IllegalStateException e) {
            System.out.println("Error at ShopOwnerService:saveShopOwner");
            System.out.println(e.getMessage());
            return false;
        }
        return true;
    }
}
