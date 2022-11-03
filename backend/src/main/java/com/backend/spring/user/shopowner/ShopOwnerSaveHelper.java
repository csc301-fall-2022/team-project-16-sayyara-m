package com.backend.spring.user.shopowner;

import com.backend.spring.address.Address;
import com.backend.spring.address.AddressRepository;
import com.backend.spring.shop.Shop;
import com.backend.spring.shop.ShopRepository;
import com.backend.spring.user.role.RoleEnum;
import com.backend.spring.user.role.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Helper class for Shop Owner that abstracts how it is being saved.
 * After taking the required repositories through the constructor, the `save()` method will use them
 * to save all objects passed in and make necessary assignments to fields.
 * <p>
 * For example, a Shop owner needs to be assigned a Shop, and this class will allow you to pass in
 * a Shop owner and a Shop and assign those values itself without you needing to assign them.
 * <p>
 * It will also set the appropriate role of the Shop Owner and encrypt the password.
 */
@Service
@RequiredArgsConstructor
public class ShopOwnerSaveHelper {

    private final ShopOwnerRepository shopOwnerRepository;

    private final ShopRepository shopRepository;

    private final AddressRepository addressRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    /**
     * Saves a vehicle owner in the database as well as the vehicle assigned to it.
     * The appropriate role will be pulled from the database and assigned to this vehicle owner.
     * Also assigns the vehicle owner to the vehicle and the vehicle to the vehicle owner.
     *
     * @param shopOwner Shop Owner to save
     * @param shop      Shop to assign to the shop owner
     * @param address   address to assign to the shop of this shop owner
     * @return Shop Owner after successfully saving
     */
    public ShopOwner save(@NonNull ShopOwner shopOwner, @NonNull Shop shop, @NonNull Address address) {
        setShopOwner(shopOwner, shop, address);
        return shopOwnerRepository.save(shopOwner);
    }

    /**
     * Mainly used for testing
     * <p>
     * Flushing allows for insertions to take place right away in the middle of a transaction, which allows
     * for easier testing of database constraint violations.
     */
    ShopOwner saveAndFlush(@NonNull ShopOwner shopOwner, @NonNull Shop shop, @NonNull Address address) {
        setShopOwner(shopOwner, shop, address);
        return shopOwnerRepository.saveAndFlush(shopOwner);
    }

    private void setShopOwner(ShopOwner shopOwner, Shop shop, Address address) {
        shopOwner.addRole(roleRepository.findByName(RoleEnum.SHOP_OWNER.getValue()));
        shopOwner.setPassword(passwordEncoder.encode(shopOwner.getPassword()));
        shopOwner.setShop(shopRepository.save(shop));
        shop.setAddress(addressRepository.save(address));
        shop.setShopOwner(shopOwner);
    }
}
