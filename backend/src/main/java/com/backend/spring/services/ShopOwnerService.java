package com.backend.spring.services;

import com.backend.spring.dto.AppUserDTO;
import com.backend.spring.dto.AppUserDTOTransfer;
import com.backend.spring.entities.ShopOwner;
import com.backend.spring.exceptions.InvalidDataException;
import com.backend.spring.exceptions.InvalidPasswordException;
import com.backend.spring.exceptions.ViolatedConstraintException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class ShopOwnerService {
    private final ShopOwnerSaveHelper shopOwnerSaveHelper;

    private final AppUserDTOTransfer appUserDTOTransfer;

    private final PasswordEncoder passwordEncoder;

    private final ShopOwnerRetriever shopOwnerRetriever;

    public ShopOwner getShopOwner(String authorization) throws InvalidDataException {
        return shopOwnerRetriever.getShopOwner(authorization);
    }

    public void saveShopOwner(ShopOwner shopOwner) throws ViolatedConstraintException {
        shopOwnerSaveHelper.save(shopOwner);
    }

    public AppUserDTO updateShopOwner(AppUserDTO appUserDTO, String authorization) throws ViolatedConstraintException, InvalidDataException {
        ShopOwner shopOwner = shopOwnerRetriever.getShopOwner(authorization);
        appUserDTOTransfer.DTOtoAppUser(shopOwner, appUserDTO);
        shopOwnerSaveHelper.save(shopOwner);
        return appUserDTOTransfer.appUsertoDTO(shopOwner);
    }

    @Transactional
    public void updateShopOwnerPassword(String oldPassword, String newPassword, String authorization) throws InvalidPasswordException {
        ShopOwner shopOwner = shopOwnerRetriever.getShopOwner(authorization);
        if (!passwordEncoder.matches(oldPassword, shopOwner.getPassword()))
            throw new InvalidPasswordException("Old password is incorrect");
        if (passwordEncoder.matches(newPassword, shopOwner.getPassword()))
            throw new InvalidPasswordException("New password is the same as previous. Try changing to something stronger!");

        shopOwner.setPassword(passwordEncoder.encode(newPassword));
    }
}
