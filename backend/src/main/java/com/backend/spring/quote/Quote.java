package com.backend.spring.quote;

import com.backend.spring.shop.Shop;
import com.backend.spring.user.vehicleowner.VehicleOwner;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

import static javax.persistence.CascadeType.ALL;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "quotes")
public class Quote {
    @Id
    @GeneratedValue
    @Column(name = "quote_id")
    private Long id;

    @ManyToOne(cascade = ALL, optional = false)
    @JoinColumn(name = "shop_id", referencedColumnName = "shop_id")
    private Shop shop;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private VehicleOwner vehicleOwner;

    private String service;

    private Double price;

    @Column(name = "expiry_time", nullable = false, columnDefinition = "timestamp without time zone")
    private LocalDateTime expiry;
}
