package com.backend.spring.dto;

import com.backend.spring.entities.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AppUserDTOTransfer {
    public AppUser DTOtoAppUser(AppUser appUser, AppUserDTO appUserDTO) {
        appUser.setUsername(appUserDTO.getUsername());
        appUser.setFirstName(appUserDTO.getFirstName());
        appUser.setLastName(appUserDTO.getLastName());
        appUser.setEmail(appUserDTO.getEmail());
        appUser.setPhoneNumber(appUserDTO.getPhoneNumber());
        return appUser;
    }

    public AppUserDTO appUsertoDTO(AppUser appUser) {
        return new AppUserDTO(appUser.getFirstName(), appUser.getLastName(), appUser.getEmail(), appUser.getPhoneNumber(), appUser.getUsername());
    }
}
