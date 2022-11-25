package com.backend.spring.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY;
import static javax.persistence.CascadeType.ALL;
import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.GenerationType.SEQUENCE;
import static lombok.AccessLevel.NONE;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "quotes")
public class Quote {
    @Id
    @SequenceGenerator(name = "quote_sequence", sequenceName = "quote_sequence", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "quote_sequence")
    @Column(name = "quote_id")
    private Long id;

    @ToString.Exclude
    @JsonProperty(access = WRITE_ONLY)
    @ManyToOne(optional = false)
    @JoinColumn(name = "shop_id", referencedColumnName = "shop_id")
    private Shop shop;

    @ManyToOne(cascade = MERGE)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private VehicleOwner vehicleOwner;

    @ManyToOne(cascade = ALL)
    @JoinColumn(name = "service_id", referencedColumnName = "service_id")
    private Service service;

    private Double price = null;

    @Column(name = "expiry_time", nullable = false, columnDefinition = "timestamp without time zone")
    private LocalDateTime expiryTime;

    @Getter(value = NONE)
    @NotNull
    private QuoteStatus quoteStatus = QuoteStatus.PENDING_REVIEW;

    public Quote(Shop shop, VehicleOwner vehicleOwner, Service service, Double price, LocalDateTime expiryTime) {
        this.shop = shop;
        this.vehicleOwner = vehicleOwner;
        this.service = service;
        this.expiryTime = expiryTime;
    }

    public QuoteStatus getQuoteStatus() {
        if (expiryTime.isBefore(LocalDateTime.now())) {
            this.quoteStatus = QuoteStatus.EXPIRED;
        }
        return quoteStatus;
    }
}
