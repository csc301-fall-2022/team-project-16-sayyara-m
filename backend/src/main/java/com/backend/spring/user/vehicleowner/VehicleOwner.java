package com.backend.spring.user.vehicleowner;

import com.backend.spring.appointment.Appointment;
import com.backend.spring.quote.Quote;
import com.backend.spring.user.appuser.AppUser;

import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.ALL;

public class VehicleOwner extends AppUser {
    @OneToMany(cascade = ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private final List<Vehicle> vehicles = new ArrayList<>();

    @OneToMany(mappedBy = "vehicleOwner")
    private final List<Appointment> appointments = new ArrayList<>();

    @OneToMany(mappedBy = "vehicleOwner")
    private final List<Quote> quotes = new ArrayList<>();
}
