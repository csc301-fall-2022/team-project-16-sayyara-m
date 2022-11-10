package com.backend.spring.user.vehicleowner;

import com.backend.spring.user.appuser.AppUser;
import com.backend.spring.vehicle.Vehicle;
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
public class VehicleOwner extends AppUser {

    @OneToOne(cascade = ALL, mappedBy = "owner")
    private Vehicle vehicle;

    public VehicleOwner(String firstName, String lastName, String email, String phoneNumber, String username, String password) {
        super(firstName, lastName, email, phoneNumber, username, password);
    }
}
