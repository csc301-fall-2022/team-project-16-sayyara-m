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
import java.time.LocalDateTime;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY;
import static javax.persistence.CascadeType.ALL;
import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.GenerationType.SEQUENCE;

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

    private Double price;
    @Column(name = "expiry_time", nullable = false, columnDefinition = "timestamp without time zone")
    private LocalDateTime expiryTime;

    public Quote(Shop shop, VehicleOwner vehicleOwner, Service service, Double price, LocalDateTime expiryTime) {
        this.shop = shop;
        this.vehicleOwner = vehicleOwner;
        this.service = service;
        this.price = price;
        this.expiryTime = expiryTime;
    }
}
