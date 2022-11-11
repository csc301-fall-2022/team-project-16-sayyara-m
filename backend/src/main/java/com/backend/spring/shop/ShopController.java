package com.backend.spring.shop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

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
    public ResponseEntity<Shop> updateShop(HttpServletRequest request, @RequestBody Shop shop) {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        return ResponseEntity.ok().body(service.updateShop(shop, authorizationHeader));
    }
}
