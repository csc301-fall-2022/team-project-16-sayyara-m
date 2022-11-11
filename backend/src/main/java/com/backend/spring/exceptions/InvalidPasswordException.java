package com.backend.spring.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class InvalidPasswordException extends InvalidAuthorizationException {
    public InvalidPasswordException(String message) {
        super(message);
    }
}
