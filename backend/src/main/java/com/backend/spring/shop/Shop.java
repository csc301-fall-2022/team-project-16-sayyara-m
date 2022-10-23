package com.backend.spring.shop;

import com.backend.spring.appointment.Appointment;
import com.backend.spring.user.appuser.AppUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.List;

import static javax.persistence.CascadeType.ALL;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "shops")
public class Shop {
    @Id
    @GeneratedValue
    @Column(name = "shop_id")
    private long id;

    @OneToOne(optional = false, cascade = ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private AppUser shopOwner;

    @OneToOne(cascade = ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "address_id", nullable = false)
    private Address address;

    @OneToMany(cascade = ALL)
    @JoinColumn(name = "shop_id", referencedColumnName = "shop_id")
    private List<Appointment> appointments;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "email")
    private String email;

}
