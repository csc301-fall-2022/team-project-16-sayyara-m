package com.backend.spring.user.shopowner;

import com.backend.spring.shop.Address;
import com.backend.spring.shop.Shop;
import com.backend.spring.user.appuser.AppUser;
import com.backend.spring.user.role.Role;
import com.backend.spring.user.role.RoleEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

import static javax.persistence.FetchType.EAGER;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class ShopOwner extends AppUser {
    @OneToOne(mappedBy = "shopOwner", fetch = EAGER, optional = false)
    private Shop shop;

    /**
     * Constructor that takes data about a ShopOwner and Shop and creates a new Shop with the shop owner set to this
     * ShopOwner.
     *
     * @param firstName       first name of shop owner
     * @param lastName        last name of shop owner
     * @param userEmail       email of shop owner
     * @param userPhoneNumber phone number of shop owner
     * @param username        username of shop owner
     * @param password        password of shop owner
     * @param shopAddress     address of shop
     * @param shopPhoneNumber phone number of phone
     * @param shopEmail       email of shop
     */
    public ShopOwner(String firstName, String lastName, String userEmail, String userPhoneNumber, String username, String password, Address shopAddress, String shopPhoneNumber, String shopEmail) {
        super(new Role(RoleEnum.SHOP_OWNER), firstName, lastName, userEmail, userPhoneNumber, username, password);
        this.shop = new Shop(shopAddress, shopPhoneNumber, shopEmail, this);
    }

    @Override
    public String toString() {
        return "ShopOwner{" +
                "id=" + id +
                ", role=" + role +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", " + shop +
                '}';
    }
}
