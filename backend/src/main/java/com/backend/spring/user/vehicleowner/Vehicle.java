package com.backend.spring.user.vehicleowner;

import com.backend.spring.user.appuser.AppUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vehicles")
public class Vehicle {
    @Id
    @GeneratedValue
    @Column(name = "vehicle_id")
    private long id;
    private int year;
    private String make;
    private String model;
    private String vin;
    private String plate;

    @ManyToOne
    private AppUser owner;
}
