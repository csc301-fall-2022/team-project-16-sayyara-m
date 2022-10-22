package com.backend.spring;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table
@NoArgsConstructor
public class Appointment {
    @Id @Getter
    private long id;

    @ManyToOne
    @JoinColumn
    @Getter @Setter
    private Shop shop;

    @ManyToOne
    @JoinColumn
    @Getter @Setter
    private Vehicle vehicle;

    @Getter @Setter
    private Date date;
    @Getter @Setter
    private Date length;
}
