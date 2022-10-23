package com.backend.spring.appointment;

import com.backend.spring.shop.Shop;
import com.backend.spring.user.appuser.AppUser;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue
    @Column(name = "appointment_id")
    private long id;

    @ManyToOne
    private Shop shop;

    @ManyToOne(cascade = ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private AppUser vehicleOwner;

    @Column(name = "start_date", nullable = false, columnDefinition = "timestamp without time zone")
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false, columnDefinition = "timestamp without time zone")
    private LocalDateTime endDate;

    // endDate - startDate
    @Transient
    @Getter(AccessLevel.NONE) // to override
    private Duration duration;

    /**
     * duration = endDate - startDate
     * @return difference between endDate and startDate for this appointment
     */
    public Duration getDuration() {
        return Duration.between(startDate, endDate);
    }
}
