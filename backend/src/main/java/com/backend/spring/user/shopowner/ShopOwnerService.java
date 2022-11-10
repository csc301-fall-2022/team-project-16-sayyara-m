package com.backend.spring.user.shopowner;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.backend.spring.exceptions.InvalidAuthorizationException;
import com.backend.spring.exceptions.InvalidDataException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.backend.spring.user.security.SecurityConstants.ALGORITHM;
import static com.backend.spring.user.security.SecurityConstants.TOKEN_PREFIX;

@Service
@RequiredArgsConstructor
public class ShopOwnerService {
    private final ShopOwnerSaveHelper shopOwnerSaveHelper;

    private final ShopOwnerRepository shopOwnerRepository;

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
        String username = "";
        if (authorization != null && authorization.startsWith(TOKEN_PREFIX)) {
            try {
                String access_token = authorization.substring(TOKEN_PREFIX.length());
                JWTVerifier verifier = JWT.require(ALGORITHM).build();
                DecodedJWT decodedJWT = verifier.verify(access_token);
                username = decodedJWT.getSubject();
            }
            catch (JWTVerificationException e) {
                System.out.println(e.getMessage());
                throw new InvalidAuthorizationException(e.getLocalizedMessage());
            }
        } else {
            throw new InvalidAuthorizationException("Invalid/Missing Authorization header");
        }

        return shopOwnerRepository.findByUsername(username);
    }
}
