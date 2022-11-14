package com.backend.spring.services;

import com.backend.spring.dto.AppUserDTO;
import com.backend.spring.dto.AppUserDTOTransfer;
import com.backend.spring.entities.ShopOwner;
import com.backend.spring.exceptions.InvalidDataException;
import com.backend.spring.exceptions.InvalidPasswordException;
import com.backend.spring.exceptions.ViolatedConstraintException;
import com.backend.spring.repositories.ShopOwnerRepository;
import com.backend.spring.security.AuthHeaderParser;
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

    public void saveShopOwner(ShopOwner shopOwner) throws ViolatedConstraintException {
        shopOwnerSaveHelper.save(shopOwner, shopOwner.getShop(), shopOwner.getShop().getAddress());
    }

    public ShopOwner getShopOwner(String authorization) throws InvalidDataException {
        String username = new AuthHeaderParser(authorization).getUsername();

        return shopOwnerRepository.findByUsername(username);
    }

    public AppUserDTO updateShopOwner(AppUserDTO appUserDTO, String authorization) throws ViolatedConstraintException {
        ShopOwner shopOwner = getShopOwner(authorization);
        appUserDTOTransfer.DTOtoAppUser(shopOwner, appUserDTO);
        shopOwnerSaveHelper.save(shopOwner, shopOwner.getShop(), shopOwner.getShop().getAddress());
        return appUserDTOTransfer.appUsertoDTO(shopOwner);
    }

    @Transactional
    public void updateShopOwnerPassword(String oldPassword, String newPassword, String authorization) throws InvalidPasswordException {
        ShopOwner shopOwner = getShopOwner(authorization);
        if (!passwordEncoder.matches(oldPassword, shopOwner.getPassword()))
            throw new InvalidPasswordException("Old password is incorrect");

        shopOwner.setPassword(passwordEncoder.encode(newPassword));
    }
}
