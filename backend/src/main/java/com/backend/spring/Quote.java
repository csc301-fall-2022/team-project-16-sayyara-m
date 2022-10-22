package com.backend.spring;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table
@NoArgsConstructor
public class Quote {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn
    @Getter
    private Shop shop;

    @ManyToOne
    @JoinColumn
    @Getter
    private Vehicle vehicle;

    @Getter
    private String service;
    @Getter
    private Double price;
    @Getter
    private Date expiry;

    public Quote(Long id, Shop shop, Vehicle vehicle, String service, Double price, Date expiry) {
        this.id = id;
        this.shop = shop;
        this.vehicle = vehicle;
        this.service = service;
        this.price = price;
        this.expiry = expiry;
    }
}
