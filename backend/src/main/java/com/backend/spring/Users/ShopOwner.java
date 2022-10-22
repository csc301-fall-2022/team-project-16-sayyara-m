package com.backend.spring.Users;

import com.backend.spring.Shop;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table
@NoArgsConstructor
public class ShopOwner extends User {
    @OneToMany
    private List<Shop> shops = new ArrayList<>();

    public ShopOwner(Long id, String firstName, String lastName, String email, String phone, String username, String password) {
        super(id, firstName, lastName, email, phone, username, password);
    }
}
