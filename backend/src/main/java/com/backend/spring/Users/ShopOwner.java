package com.backend.spring.Users;

import com.backend.spring.Shop;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
public class ShopOwner extends User {
    @OneToMany
    @Getter @Setter
    private List<Shop> shops = new ArrayList<>();

    public ShopOwner(Long id, String firstName, String lastName, String email, String phone, String username, String password) {
        super(id, firstName, lastName, email, phone, username, password);
    }
}
