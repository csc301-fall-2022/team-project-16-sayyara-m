package com.backend.spring.shop;

import com.backend.spring.address.Address;
import com.backend.spring.appointment.Appointment;
import com.backend.spring.quote.Quote;
import com.backend.spring.user.shopowner.ShopOwner;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.GenerationType.SEQUENCE;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "shops")
public class Shop {
    @Id
    @SequenceGenerator(name = "shop_sequence", sequenceName = "shop_sequence", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "shop_sequence")
    @Column(name = "shop_id")
    private Long id;

    @OneToOne(optional = false, cascade = ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private ShopOwner shopOwner;

    @OneToOne(cascade = ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "address_id", nullable = false)
    private Address address;

    @OneToMany(mappedBy = "shop", fetch = FetchType.EAGER)
    private List<Appointment> appointments = new ArrayList<>();

    @OneToMany(mappedBy = "shop", fetch = FetchType.LAZY)
    private List<Quote> quotes = new ArrayList<>();

    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "email")
    private String email;

    public Shop(Address address, String phoneNumber, String email, ShopOwner shopOwner) {
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.shopOwner = shopOwner;
    }

    @Override
    public String toString() {
        return "Shop{" +
                "id=" + id +
                ", shopOwner=" + shopOwner.getFirstName() +
                ", address=" + address +
                ", appointments=" + appointments +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

}
