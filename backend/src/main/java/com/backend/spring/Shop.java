package com.backend.spring;

import com.backend.spring.Users.ShopOwner;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table
public class Shop {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn
    @Getter @Setter
    private ShopOwner shopOwner;
}
