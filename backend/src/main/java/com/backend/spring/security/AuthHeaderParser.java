package com.backend.spring.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.backend.spring.exceptions.InvalidAuthorizationException;

/**
 * Utility class that takes an authorization header in the form "Bearer `token`" and retrieves the username
 * associated with that user as well as the token that gets parsed from the header.
 * <p>
 * Use getToken() and getUsername() to retrieve the token and username respectively.
 */
public class AuthHeaderParser {
    String username;
    String token;

    public AuthHeaderParser(String authorization) {
        if (authorization != null && authorization.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            try {
                this.token = authorization.substring(SecurityConstants.TOKEN_PREFIX.length());
                JWTVerifier verifier = JWT.require(SecurityConstants.ALGORITHM).build();
                DecodedJWT decodedJWT = verifier.verify(token);
                this.username = decodedJWT.getSubject();
            } catch (JWTVerificationException e) {
                System.out.println(e.getMessage());
                throw new InvalidAuthorizationException(e.getLocalizedMessage());
            }
        } else {
            throw new InvalidAuthorizationException("Invalid/Missing Authorization header");
        }
    }

    public String getUsername() {
        return username;
    }

    public String getToken() {
        return token;
    }
}
