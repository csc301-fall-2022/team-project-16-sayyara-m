package com.backend.spring.services;

import com.backend.spring.entities.RoleEnum;
import com.backend.spring.entities.ShopOwner;
import com.backend.spring.exceptions.ViolatedConstraintException;
import com.backend.spring.repositories.RoleRepository;
import com.backend.spring.repositories.ShopOwnerRepository;
import com.backend.spring.validators.ShopOwnerValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
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

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    /**
     * Saves a vehicle owner in the database as well as the vehicle assigned to it.
     * The appropriate role will be pulled from the database and assigned to this vehicle owner.
     * Also assigns the vehicle owner to the vehicle and the vehicle to the vehicle owner.
     *
     * @param shopOwner Shop Owner to save
     * @return Shop Owner after successfully saving
     */
    public ShopOwner save(@NonNull ShopOwner shopOwner) throws ViolatedConstraintException {
        setShopOwner(shopOwner);
        return new SaveErrorTrapper()
                .checkConstraintViolation(() -> shopOwnerRepository.save(shopOwner));
    }

    private void setShopOwner(ShopOwner shopOwner) {
        shopOwner.addRole(roleRepository.findByName(RoleEnum.SHOP_OWNER.getValue()));
        shopOwner.getShop().setShopOwner(shopOwner);
        new ShopOwnerValidator(shopOwner).validate(); // validate before encrypting password
        shopOwner.setPassword(passwordEncoder.encode(shopOwner.getPassword()));
    }
}
