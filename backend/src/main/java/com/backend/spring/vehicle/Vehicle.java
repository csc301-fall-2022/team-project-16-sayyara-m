package com.backend.spring.vehicle;

import com.backend.spring.user.vehicleowner.VehicleOwner;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import static javax.persistence.GenerationType.SEQUENCE;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vehicles")
public class Vehicle {
    @JsonIgnore
    @Id
    @SequenceGenerator(name = "vehicle_sequence", sequenceName = "vehicle_sequence", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "vehicle_sequence")
    @Column(name = "vehicle_id")
    private Long id;

    @Column(name = "vehicle_year")
    private int year;

    @Column(name = "vehicle_make")
    private String make;

    @Column(name = "vehicle_model")
    private String model;

    @Column(name = "vehicle_vin")
    private String vin;

    @Column(name = "vehicle_plate")
    private String plate;

    @JsonIgnore
    @ToString.Exclude
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private VehicleOwner owner;

    public Vehicle(int year, String make, String model, String vin, String plate) {
        this.year = year;
        this.make = make;
        this.model = model;
        this.vin = vin;
        this.plate = plate;
    }
}
