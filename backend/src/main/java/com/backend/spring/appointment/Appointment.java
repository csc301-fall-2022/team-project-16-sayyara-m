package com.backend.spring.appointment;

import com.backend.spring.shop.Shop;
import com.backend.spring.user.vehicleowner.VehicleOwner;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.time.Duration;
import java.time.LocalDateTime;

import static javax.persistence.CascadeType.ALL;
import static lombok.AccessLevel.NONE;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue
    @Column(name = "appointment_id")
    private long id;

    @ManyToOne(cascade = ALL, optional = false)
    @JoinColumn(name = "shop_id", referencedColumnName = "shop_id")
    private Shop shop;

    @ManyToOne(cascade = ALL, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private VehicleOwner vehicleOwner;

    @Column(name = "start_date", nullable = false, columnDefinition = "timestamp without time zone")
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false, columnDefinition = "timestamp without time zone")
    private LocalDateTime endDate;

    // endDate - startDate
    @Transient
    @Getter(NONE) // to override getter
    private Duration duration;

    /**
     * duration = endDate - startDate
     *
     * @return difference between endDate and startDate for this appointment
     */
    public Duration getDuration() {
        return Duration.between(startDate, endDate);
    }
}
