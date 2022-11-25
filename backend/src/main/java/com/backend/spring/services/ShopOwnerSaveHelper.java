package com.backend.spring.services;

import com.backend.spring.entities.RoleEnum;
import com.backend.spring.entities.ShopOwner;
import com.backend.spring.exceptions.ViolatedConstraintException;
import com.backend.spring.repositories.RoleRepository;
import com.backend.spring.repositories.ShopOwnerRepository;
import com.backend.spring.validators.AppUserValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

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
        try {
            setShopOwner(shopOwner);
            return shopOwnerRepository.save(shopOwner);
        } catch (DataIntegrityViolationException ex) {
            String msg = ex.getMessage();
            if (ex.getCause().getCause() instanceof SQLException e) {
                if (e.getMessage().contains("Key")) {
                    msg = formatErrorMessage(e.getMessage());
                }
            }
            throw new ViolatedConstraintException(msg);
        }
    }

    private void replaceCharacter(StringBuilder sb, char c, String replacement) {
        int index = sb.indexOf(String.valueOf(c));
        if (index != -1) {
            sb.replace(index, index + 1, replacement);
        }
    }

    /**
     * Format error message of the form
     * "Details: key (email)=(email@gmail.com) already exists"
     * into
     * "Email 'email@gmail.com' already exists"
     */
    private String formatErrorMessage(String message) {
        StringBuilder stringBuilder = new StringBuilder(message.substring(message.indexOf("Key") + 4));

        replaceCharacter(stringBuilder, '(', "");
        replaceCharacter(stringBuilder, ')', " ");
        replaceCharacter(stringBuilder, '(', "'");
        replaceCharacter(stringBuilder, ')', "'");
        replaceCharacter(stringBuilder, '=', "");
        replaceCharacter(stringBuilder, '_', " ");

        stringBuilder.setCharAt(0, Character.toUpperCase(stringBuilder.charAt(0)));
        return stringBuilder.toString();
    }

    private void setShopOwner(ShopOwner shopOwner) {
        shopOwner.addRole(roleRepository.findByName(RoleEnum.SHOP_OWNER.getValue()));
        new AppUserValidator(shopOwner).validate(); // validate before encrypting password
        shopOwner.setPassword(passwordEncoder.encode(shopOwner.getPassword()));
    }
}
