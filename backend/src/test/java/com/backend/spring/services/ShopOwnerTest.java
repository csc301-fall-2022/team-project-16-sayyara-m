package com.backend.spring.services;

import com.backend.spring.entities.Address;
import com.backend.spring.entities.Shop;
import com.backend.spring.entities.ShopOwner;
import com.backend.spring.exceptions.ViolatedConstraintException;
import com.backend.spring.repositories.ShopOwnerRepository;
import com.backend.spring.repositories.ShopRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.fail;

@SpringBootTest
class ShopOwnerTest {
    @Autowired
    private ShopOwnerRepository shopOwnerRepository;

    @Autowired
    private ShopOwnerSaveHelper saveHelper;

    @Autowired
    private ShopRepository shopRepository;

    private ShopOwner shopOwner;

    private Shop shop;

    @AfterEach
    void tearDown() {
        shopOwnerRepository.deleteAll();
        shopRepository.deleteAll();
    }

    private ShopOwner newShopOwner() {
        return new ShopOwner("abc", "Bob", "bob2@gmail.com", "+14161231234", "bob12345", "Password1!", shop);
    }

    @BeforeEach
    void setUp() {

        Address address = new Address("StreetNum", "Street", "PostalCode", "City", "M2M 2M2");

        shop = new Shop("Sayyara Shop2", address, "+14164123123", "sayyara@gmail.com");

        shopOwner = saveHelper.save(newShopOwner());

    }

    @Test
    void checkShopOwnerSaved() {
        assertThat(shopOwnerRepository.findByUsername(shopOwner.getUsername()).orElseThrow().getUsername()).isEqualTo(shopOwner.getUsername());
    }

    @Test
    void checkShopsUnique() {
        Address address2 = new Address("StreetNum", "Street", "PostalCode", "City", "Prov");
        Shop shop2 = new Shop("Sayyara Shop2", address2, "416-412-3125", "sayyara2@gmail.com");
        ShopOwner shopOwner1 = new ShopOwner("abc", "Bob", "bob3@gmail.com", "416-123-1235", "bob12346", "Password1!", shop2);
        try {
            shopOwner1 = saveHelper.save(shopOwner1);
            fail("Shops are the same and app doesn't crash: \n\t" + shopOwner + "\n\t" + shopOwner1);
        } catch (ViolatedConstraintException ignored) {
            assertThat(shopOwner1).isNotNull();
            assertThat(shopOwner).isNotNull();
        }
    }

    @Test
    void checkShopOwnerExists() {
        assertThat(shopOwner.getFirstName()).isEqualTo("abc");
    }

    @Test
    void checkRoleExists() {
        assertThat(shopOwner.getRoles().size()).isEqualTo(1);
    }

    @Test
    void checkShopExists() {
        assertThat(shopOwner.getShop().getName()).isEqualTo("Sayyara Shop2");
    }

    @Test
    void checkAddressExists() {
        assertThat(shopOwner.getShop().getAddress().getStreet()).isNotNull();
    }
}