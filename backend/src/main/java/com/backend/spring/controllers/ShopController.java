package com.backend.spring.controllers;

import com.backend.spring.entities.Shop;
import com.backend.spring.services.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@CrossOrigin
@RequestMapping(path = "shop")
public class ShopController {
    private final ShopService service;

    @Autowired
    public ShopController(ShopService service) {
        this.service = service;
    }

    @PutMapping
    public ResponseEntity<Shop> updateShop(@RequestBody Shop shop,
                                           @RequestHeader(AUTHORIZATION) String authorizationHeader) {
        return ResponseEntity.ok().body(service.updateShop(shop, authorizationHeader));
    }
}
