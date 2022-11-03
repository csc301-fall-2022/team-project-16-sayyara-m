package com.backend.spring.shop;

import com.backend.spring.address.AddressRepository;
import com.backend.spring.user.shopowner.ShopOwner;
import com.backend.spring.user.shopowner.ShopOwnerRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ShopOwnerSaveHelper {

    public final ShopOwnerRepository shopOwnerRepository;

    private final ShopRepository shopRepository;

    private final AddressRepository addressRepository;

    public ShopOwner save(ShopOwner shopOwner) {
        shopRepository.save(shopOwner.getShop());
        addressRepository.save(shopOwner.getShop().getAddress());
        return shopOwnerRepository.save(shopOwner);
    }

    public ShopOwner saveAndFlush(ShopOwner shopOwner) {
        shopRepository.save(shopOwner.getShop());
        addressRepository.save(shopOwner.getShop().getAddress());
        return shopOwnerRepository.saveAndFlush(shopOwner);
    }
}
