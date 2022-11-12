package com.backend.spring.exceptions;

import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class InvalidAuthorizationException extends JWTVerificationException {
    public InvalidAuthorizationException(String message) {
        super(message);
    }
}
