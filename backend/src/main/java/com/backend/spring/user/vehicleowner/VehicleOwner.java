package com.backend.spring.user.vehicleowner;

import com.backend.spring.appointment.Appointment;
import com.backend.spring.quote.Quote;
import com.backend.spring.user.appuser.AppUser;
import com.backend.spring.user.role.Role;
import com.backend.spring.user.role.RoleEnum;
import com.backend.spring.vehicle.Vehicle;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class VehicleOwner extends AppUser {

    @OneToMany(mappedBy = "owner")
    private List<Vehicle> vehicles = new ArrayList<>();

    @OneToMany(mappedBy = "vehicleOwner")
    private final List<Appointment> appointments = new ArrayList<>();

    @OneToMany(mappedBy = "vehicleOwner")
    private final List<Quote> quotes = new ArrayList<>();

    public VehicleOwner(String firstName,
                        String lastName,
                        String email,
                        String phoneNumber,
                        String username,
                        String password) {
        super(new Role(RoleEnum.VEHICLE_OWNER),
                firstName,
                lastName,
                email,
                phoneNumber,
                username,
                password);
    }

    @Override
    public String toString() {
        return "VehicleOwner{" +
                "vehicles=" + vehicles +
                ", appointments=" + appointments +
                ", quotes=" + quotes +
                ", id=" + id +
                ", role=" + role +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
