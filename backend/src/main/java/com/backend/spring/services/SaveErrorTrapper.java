package com.backend.spring.services;

import com.backend.spring.exceptions.ViolatedConstraintException;
import org.springframework.dao.DataIntegrityViolationException;

import java.sql.SQLException;
import java.util.function.Supplier;

public class SaveErrorTrapper {

    // This method is used to trap errors that occur when saving an entity to the database.
    public <T> T checkConstraintViolation(Supplier<T> saveMethod) throws ViolatedConstraintException {
        try {
            return saveMethod.get();
        } catch (DataIntegrityViolationException ex) {
            String msg = ex.getMessage();
            if (ex.getCause().getCause() instanceof SQLException e) {
                if (e.getMessage().contains("Key")) {
                    msg = formatErrorMessage(e.getMessage());
                }
            }
            throw new ViolatedConstraintException(msg);
        }
    }


    /**
     * Format error message of the form
     * "Details: key (email)=(email@gmail.com) already exists"
     * into
     * "Email 'email@gmail.com' already exists"
     */
    private String formatErrorMessage(String message) {
        StringBuilder stringBuilder = new StringBuilder(message.substring(message.indexOf("Key") + 4));

        replaceCharacter(stringBuilder, '(', "");
        replaceCharacter(stringBuilder, ')', " ");
        replaceCharacter(stringBuilder, '(', "'");
        replaceCharacter(stringBuilder, ')', "'");
        replaceCharacter(stringBuilder, '=', "");
        replaceCharacter(stringBuilder, '_', " ");

        stringBuilder.setCharAt(0, Character.toUpperCase(stringBuilder.charAt(0)));
        return stringBuilder.toString();
    }

    private void replaceCharacter(StringBuilder sb, char c, String replacement) {
        int index = sb.indexOf(String.valueOf(c));
        if (index != -1) {
            sb.replace(index, index + 1, replacement);
        }
    }

}
