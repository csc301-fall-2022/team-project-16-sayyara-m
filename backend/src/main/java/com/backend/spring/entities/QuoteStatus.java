package com.backend.spring.entities;

import com.fasterxml.jackson.annotation.JsonValue;

public enum QuoteStatus {
    PENDING_REVIEW("Pending Review"),
    PENDING_APPROVAL("Pending Approval"),
    ACCEPTED("Accepted"),
    REJECTED("Rejected"),
    EXPIRED("Expired");

    private final String status;

    QuoteStatus(String status) {
        this.status = status;
    }

    public static QuoteStatus getStatus(String status) {
        for (QuoteStatus s : QuoteStatus.values()) {
            if (s.name().replace('_', ' ').equalsIgnoreCase(status)) {
                return s;
            }
        }
        return null;
    }

    public static boolean isValid(String status) {
        return getStatus(status) != null;
    }

    @JsonValue
    public String getStatus() {
        return status;
    }
}