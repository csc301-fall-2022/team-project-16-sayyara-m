package com.backend.spring.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY;
import static javax.persistence.CascadeType.ALL;

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@Entity
public class VehicleOwner extends UserInfo {

    @OneToOne(cascade = ALL, mappedBy = "owner")
    private Vehicle vehicle;

    @OneToMany(mappedBy = "vehicleOwner", cascade = ALL)
    @JsonProperty(access = WRITE_ONLY)
    @ToString.Exclude
    private List<Quote> quotes = new ArrayList<>();

    @OneToMany(mappedBy = "vehicleOwner", cascade = ALL)
    @ToString.Exclude
    @JsonProperty(access = WRITE_ONLY)
    private List<Appointment> appointments = new ArrayList<>();

    public VehicleOwner(String firstName, String lastName, String email, String phoneNumber, Vehicle vehicle) {
        super(firstName, lastName, email, phoneNumber);
        this.vehicle = vehicle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof VehicleOwner that)) return false;
        return Objects.equals(vehicle, that.vehicle) &&
                Objects.equals(quotes, that.quotes) &&
                Objects.equals(appointments, that.appointments);
    }
}
