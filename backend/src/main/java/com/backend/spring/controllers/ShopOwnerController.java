package com.backend.spring.controllers;

import com.backend.spring.exceptions.InvalidPasswordException;
import com.backend.spring.dto.AppUserDTO;
import com.backend.spring.entities.ShopOwner;
import com.backend.spring.services.ShopOwnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
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
    public ResponseEntity<ShopOwner> getShopOwner(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        return ResponseEntity.ok(shopOwnerService.getShopOwner(authorizationHeader));
    }

    @PutMapping
    public ResponseEntity<AppUserDTO> updateShopOwner(HttpServletRequest request, @RequestBody AppUserDTO appUserDTO) {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        return ResponseEntity.ok(shopOwnerService.updateShopOwner(appUserDTO, authorizationHeader));
    }

    @PutMapping(path = "/password")
    public ResponseEntity<?> updateShopOwnerPassword(HttpServletRequest request, @RequestBody Passwords passwords) throws InvalidPasswordException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        shopOwnerService.updateShopOwnerPassword(passwords.oldPassword, passwords.newPassword(), authorizationHeader);
        return ResponseEntity.ok().build();
    }

    private record Passwords(String oldPassword, String newPassword) {
    }
}
