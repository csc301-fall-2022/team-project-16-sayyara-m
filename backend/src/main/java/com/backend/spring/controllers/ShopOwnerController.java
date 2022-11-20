package com.backend.spring.controllers;

import com.backend.spring.dto.AppUserDTO;
import com.backend.spring.entities.ShopOwner;
import com.backend.spring.exceptions.InvalidDataException;
import com.backend.spring.exceptions.InvalidPasswordException;
import com.backend.spring.services.ShopOwnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@CrossOrigin
@RequestMapping("shopOwner")
@RequiredArgsConstructor
public class ShopOwnerController {
    private final ShopOwnerService shopOwnerService;

    @PostMapping
    public ResponseEntity<?> signUp(@RequestBody ShopOwner shopOwner) throws URISyntaxException {
        shopOwnerService.saveShopOwner(shopOwner);
        return ResponseEntity.created(new URI("/api/shopOwner")).build();
    }

    @GetMapping
    public ResponseEntity<ShopOwner> getShopOwner(@RequestHeader(AUTHORIZATION) String authorizationHeader) throws InvalidDataException {
        return ResponseEntity.ok(shopOwnerService.getShopOwner(authorizationHeader));
    }

    @PutMapping
    public ResponseEntity<AppUserDTO> updateShopOwner(@RequestBody AppUserDTO appUserDTO,
                                                      @RequestHeader(AUTHORIZATION) String authorizationHeader) {
        return ResponseEntity.ok(shopOwnerService.updateShopOwner(appUserDTO, authorizationHeader));
    }

    @PutMapping(path = "/password")
    public ResponseEntity<?> updateShopOwnerPassword(@RequestBody Passwords passwords,
                                                     @RequestHeader(AUTHORIZATION) String authorizationHeader) throws InvalidPasswordException {
        shopOwnerService.updateShopOwnerPassword(passwords.oldPassword, passwords.newPassword(), authorizationHeader);
        return ResponseEntity.ok().build();
    }

    private record Passwords(String oldPassword, String newPassword) {
    }
}
