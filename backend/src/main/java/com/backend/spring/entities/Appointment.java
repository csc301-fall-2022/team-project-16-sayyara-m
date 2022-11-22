package com.backend.spring.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.time.Duration;
import java.time.LocalDateTime;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY;
import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.GenerationType.SEQUENCE;
import static lombok.AccessLevel.NONE;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @SequenceGenerator(name = "appointment_sequence", sequenceName = "appointment_sequence", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "appointment_sequence")
    @Column(name = "appointment_id")
    private Long id;

    @JsonProperty(access = WRITE_ONLY)
    @ToString.Exclude
    @ManyToOne(optional = false)
    @JoinColumn(name = "shop_id", referencedColumnName = "shop_id")
    private Shop shop;

    @ManyToOne(optional = false)
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

    @OneToOne(cascade = MERGE)
    @JoinColumn(name = "quote_id", referencedColumnName = "quote_id")
    private Quote quote;

    public Appointment(Shop shop, VehicleOwner vehicleOwner, LocalDateTime startDate, LocalDateTime endDate) {
        this.shop = shop;
        this.vehicleOwner = vehicleOwner;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    /**
     * duration = endDate - startDate
     *
     * @return difference between endDate and startDate for this appointment
     */
    public Duration getDuration() {
        return Duration.between(startDate, endDate);
    }
}
