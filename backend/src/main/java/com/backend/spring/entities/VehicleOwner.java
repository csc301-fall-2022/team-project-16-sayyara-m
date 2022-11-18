package com.backend.spring.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

import static javax.persistence.CascadeType.ALL;

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@Entity
public class VehicleOwner extends UserInfo {

    @OneToOne(cascade = ALL, mappedBy = "owner")
    private Vehicle vehicle;

    public VehicleOwner(String firstName, String lastName, String email, String phoneNumber) {
        super(firstName, lastName, email, phoneNumber);
    }
}
