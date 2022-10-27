package com.backend.spring.shop;

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

    @Column(name = "street", nullable = false)
    private String street;
    @Column(name = "street_number", nullable = false)
    private String streetNumber;
    @Column(name = "postal_code", nullable = false)
    private String postalCode;
    @Column(name = "city", nullable = false)
    private String city;
    @Column(name = "province", nullable = false)
    private String province;
    public Address(String street, String streetNumber, String postalCode, String city, String province) {
        this.street = street;
        this.streetNumber = streetNumber;
        this.postalCode = postalCode;
        this.city = city;
        this.province = province;
    }
}
