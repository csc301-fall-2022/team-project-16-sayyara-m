package com.backend.spring.validators;

import com.backend.spring.entities.AppUser;
import com.backend.spring.exceptions.ViolatedConstraintException;

public class AppUserValidator implements Validator {
    private final AppUser appUser;

    private final UserInfoValidator userInfoValidator;

    public AppUserValidator(AppUser appUser) {
        this.appUser = appUser;
        this.userInfoValidator = new UserInfoValidator(appUser);
    }

    /**
     * Validates the first name, last name, username, email, and password of the shop owner.
     */
    public void validate() {
        validateUsername();
        validatePassword();
        userInfoValidator.validate();
    }

    private void validateUsername() {
        String username = this.appUser.getUsername();

        if (username == null || username.length() < 8)
            throw new ViolatedConstraintException("Username must be at least 8 characters.");

        if (username.length() > 20)
            throw new ViolatedConstraintException("Username must be at most 20 characters.");

        if (!username.matches("^[a-zA-Z0-9]+$"))
            throw new ViolatedConstraintException("Username must only contain letters and numbers.");
    }

    private void validatePassword() {
        String password = this.appUser.getPassword();

        if (password == null || password.length() < 8)
            throw new ViolatedConstraintException("Password must be at least 8 characters.");

        if (!password.matches(".*[a-zA-Z]+.*"))
            throw new ViolatedConstraintException("Password must contain at least one letter.");

        if (!password.matches(".*[A-Z]+.*"))
            throw new ViolatedConstraintException("Password must contain at least one uppercase letter.");

        if (!password.matches(".*[0-9]+.*"))
            throw new ViolatedConstraintException("Password must contain at least one number.");

        if (!password.matches(".*[.!,@#$%^&*]+.*"))
            throw new ViolatedConstraintException("Password must contain at least one of .,!@#$%^&*");
    }
}
