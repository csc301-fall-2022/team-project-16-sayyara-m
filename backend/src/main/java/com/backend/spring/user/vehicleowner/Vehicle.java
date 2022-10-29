package com.backend.spring.user.vehicleowner;

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
import javax.persistence.ManyToOne;
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
    @Id
    @SequenceGenerator(name = "vehicle_sequence", sequenceName = "vehicle_sequence", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "vehicle_sequence")
    @Column(name = "vehicle_id")
    private Long id;
    private int year;
    private String make;
    private String model;
    private String vin;
    private String plate;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private VehicleOwner owner;

    public Vehicle(int year, String make, String model, String vin, String plate, VehicleOwner owner) {
        this.year = year;
        this.make = make;
        this.model = model;
        this.vin = vin;
        this.plate = plate;
        this.owner = owner;
    }
}
