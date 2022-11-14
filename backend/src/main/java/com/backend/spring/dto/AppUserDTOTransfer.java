package com.backend.spring.dto;

import com.backend.spring.entities.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AppUserDTOTransfer {
    public void DTOtoAppUser(AppUser appUser, AppUserDTO appUserDTO) {
        if (appUserDTO.getFirstName() != null)
            appUser.setFirstName(appUserDTO.getFirstName());
        if (appUserDTO.getLastName() != null)
            appUser.setLastName(appUserDTO.getLastName());
        if (appUserDTO.getEmail() != null)
            appUser.setEmail(appUserDTO.getEmail());
        if (appUserDTO.getPhoneNumber() != null)
            appUser.setPhoneNumber(appUserDTO.getPhoneNumber());
    }

    public AppUserDTO appUsertoDTO(AppUser appUser) {
        return new AppUserDTO(appUser.getFirstName(), appUser.getLastName(), appUser.getEmail(), appUser.getPhoneNumber());
    }
}
