package com.backend.spring.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import static javax.persistence.GenerationType.SEQUENCE;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "addresses")
public class Address {
    @Id
    @SequenceGenerator(name = "address_sequence", sequenceName = "address_sequence", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "address_sequence")
    @Column(name = "address_id")
    private Long id;
    @Column(name = "street_number", nullable = false)
    private String streetNumber;
    @Column(name = "street", nullable = false)
    private String street;
    @Column(name = "city", nullable = false)
    private String city;
    @Column(name = "province", nullable = false)
    private String province;
    @Column(name = "postal_code", nullable = false)
    private String postalCode;

    public Address(String streetNumber, String street, String city, String province, String postalCode) {
        this.streetNumber = streetNumber;
        this.street = street;
        this.city = city;
        this.province = province;
        this.postalCode = postalCode;
    }

    public void update(Address newAddress) {
        this.streetNumber = newAddress.streetNumber;
        this.street = newAddress.street;
        this.city = newAddress.city;
        this.province = newAddress.province;
        this.postalCode = newAddress.postalCode;
    }
}
