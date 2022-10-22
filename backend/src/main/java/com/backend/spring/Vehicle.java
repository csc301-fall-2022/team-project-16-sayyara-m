package com.backend.spring;

import com.backend.spring.User.VehicleOwner;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@NoArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue
    private long id;
    @Getter
    private int year;
    @Getter
    private String make;
    @Getter
    private String model;
    @Getter
    private String vin;
    @Getter
    private String plate;

    @ManyToOne
    @JoinColumn
    @Getter
    private VehicleOwner owner;

    @OneToMany
    @JoinColumn
    @Getter
    private List<Appointment> appointments;

    public Vehicle(long id, int year, String make, String model, String vin, String plate, VehicleOwner owner) {
        this.id = id;
        this.year = year;
        this.make = make;
        this.model = model;
        this.vin = vin;
        this.plate = plate;
        this.owner = owner;
    }
}
