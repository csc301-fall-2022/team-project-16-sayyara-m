package com.backend.spring.entities;

import com.fasterxml.jackson.annotation.JsonValue;

public enum QuoteStatus {
    ACCEPTED("Accepted"), REJECTED("Rejected"), EXPIRED("Expired"), PENDING("Pending");

    private final String status;

    QuoteStatus(String status) {
        this.status = status;
    }

    public static QuoteStatus getStatus(String status) {
        for (QuoteStatus s : QuoteStatus.values()) {
            if (s.name().equalsIgnoreCase(status)) {
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
    @JsonValue
    public String getStatus() {
        return status;
    }
}