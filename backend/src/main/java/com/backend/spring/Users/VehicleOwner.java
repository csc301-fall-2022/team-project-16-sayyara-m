package com.backend.spring.Users;

import com.backend.spring.Vehicle;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@NoArgsConstructor
public class VehicleOwner extends User {
    @OneToMany
    @Getter @Setter
    private List<Vehicle> vehicles = new ArrayList<>();

    public VehicleOwner(Long id, String firstName, String lastName, String email, String phone, String username, String password) {
        super(id, firstName, lastName, email, phone, username, password);
    }
}
