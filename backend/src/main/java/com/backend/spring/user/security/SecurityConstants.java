package com.backend.spring.user.security;

import com.auth0.jwt.algorithms.Algorithm;

import java.util.HashSet;
import java.util.Set;

public class SecurityConstants {
    private static final String SECRET = "3EAA622B1A2FDF9EB575EDCF11436";
    public static final Algorithm ALGORITHM = Algorithm.HMAC256(SECRET.getBytes());
    public static final int EXPIRATION_TIME_SHORT = 2 * 60 * 1000; // 2 minutes
    public static final int EXPIRATION_TIME_LONG = 7 * 24 * 60 * 60 * 1000; // 1 week
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String LOGIN_URL = "/api/user/login";

    public static final Set<String> SHOP_OWNER_ROUTES = new HashSet<>(Set.of(
            "/api/appointments"
    ));

}
