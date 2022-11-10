package com.backend.spring.user.shopowner;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@RestController
@CrossOrigin
@RequestMapping("/api/shopOwner")
@RequiredArgsConstructor
public class ShopOwnerController {
    private final ShopOwnerService shopOwnerService;

    @PostMapping
    public ResponseEntity<?> signUp(@RequestBody ShopOwner shopOwner) {
        if (shopOwnerService.saveShopOwner(shopOwner)) {
            return new ResponseEntity<>(OK);
        }
        return new ResponseEntity<>(UNAUTHORIZED);
    }

    @GetMapping
    public ResponseEntity<ShopOwner> getShopOwner(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        return ResponseEntity.ok().body(shopOwnerService.getShopOwner(authorizationHeader));
    }
}
