package com.backend.spring;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.Period;
import java.util.Date;

@Entity
@NoArgsConstructor
public class Appointment {
    @Id @Getter
    private long id;

    @ManyToOne
    @JoinColumn
    @Getter
    private Shop shop;

    @ManyToOne
    @JoinColumn
    @Getter
    private Vehicle vehicle;

    @Getter
    private Date date;
    @Getter
    private Period length;

    public Appointment(long id, Shop shop, Vehicle vehicle, Date date, Period length) {
        this.id = id;
        this.shop = shop;
        this.vehicle = vehicle;
        this.date = date;
        this.length = length;
    }
}
