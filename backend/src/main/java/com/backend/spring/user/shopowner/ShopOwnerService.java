package com.backend.spring.user.shopowner;

import com.backend.spring.exceptions.InvalidDataException;
import com.backend.spring.exceptions.InvalidPasswordException;
import com.backend.spring.user.appuser.AppUserDTO;
import com.backend.spring.user.appuser.AppUserDTOTransfer;
import com.backend.spring.user.security.AuthHeaderParser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class ShopOwnerService {
    private final ShopOwnerSaveHelper shopOwnerSaveHelper;

    private final ShopOwnerRepository shopOwnerRepository;

    private final AppUserDTOTransfer appUserDTOTransfer;

    private final PasswordEncoder passwordEncoder;

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

    @Transactional
    public AppUserDTO updateShopOwner(AppUserDTO appUserDTO, String authorization) {
        ShopOwner shopOwner = getShopOwner(authorization);
        shopOwner.updateUserInfo(appUserDTOTransfer.DTOtoAppUser(shopOwner, appUserDTO));
        return appUserDTOTransfer.appUsertoDTO(shopOwner);
    }

    @Transactional
    public void updateShopOwnerPassword(String oldPassword, String newPassword, String authorization) throws InvalidPasswordException {
        ShopOwner shopOwner = getShopOwner(authorization);
        if (!passwordEncoder.matches(oldPassword, shopOwner.getPassword()))
            throw new InvalidPasswordException("Password is incorrect");

        shopOwner.setPassword(passwordEncoder.encode(newPassword));
    }
}
