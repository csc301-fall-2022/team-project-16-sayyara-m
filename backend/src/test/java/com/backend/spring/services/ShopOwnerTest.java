package com.backend.spring.services;

import com.backend.spring.entities.Address;
import com.backend.spring.entities.ShopOwner;
import com.backend.spring.repositories.ShopOwnerRepository;
import com.backend.spring.entities.Shop;
import com.backend.spring.repositories.ShopRepository;
import com.backend.spring.entities.Role;
import com.backend.spring.entities.RoleEnum;
import com.backend.spring.repositories.RoleRepository;
import com.backend.spring.services.ShopOwnerSaveHelper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.fail;

@SpringBootTest
class ShopOwnerTest {
    @Autowired
    private ShopOwnerRepository shopOwnerRepository;

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private ShopOwnerSaveHelper saveHelper;

    private ShopOwner shopOwner;

    private Shop shop;
    private Address address;

    @Autowired
    private RoleRepository roleRepository;

    @AfterEach
    void tearDown() {
        shopRepository.deleteAll();
        shopOwnerRepository.deleteAll();
        roleRepository.deleteAll();
    }

    @BeforeEach
    void setUp() {
        roleRepository.save(new Role(RoleEnum.SHOP_OWNER));

        address = new Address("StreetNum", "Street", "PostalCode", "City", "Prov");

        shop = new Shop("Sayyara Shop2", address, "416-412-3123", "sayyara@gmail.com");

        shopOwner = new ShopOwner("abc2", "Bob2", "bob2@gmail.com", "416-123-1234", "bob2", "password", shop);
        shopOwner.addRole(roleRepository.findByName(RoleEnum.SHOP_OWNER.getValue()));
        shopOwner = shopOwnerRepository.save(shopOwner);

    }

    @Test
    void checkShopOwnerSaved() {
        assertThat(shopOwnerRepository.findByUsername(shopOwner.getUsername()).getUsername()).isEqualTo(shopOwner.getUsername());
    }

    @Test
    void checkShopsUnique() {
        ShopOwner shopOwner1 = new ShopOwner("abc2", "Bob2", "bob2@gmail.com", "416-123-1234", "bob2", "password");
        try {
            shopOwner = saveHelper.saveAndFlush(shopOwner, shop, address);
            shopOwner1 = saveHelper.saveAndFlush(shopOwner1, shop, address);
            fail("Shops are the same and app doesn't crash: \n\t" + shopOwner + "\n\t" + shopOwner1);
        } catch (DataIntegrityViolationException ignored) {
            assertThat(shopOwner1).isNotNull();
            assertThat(shopOwner).isNotNull();
        }
    }

    @Test
    void checkShopOwnerExists() {
        assertThat(shopOwner.getFirstName()).isEqualTo("abc2");
    }

    @Test
    void checkRoleExists() {
        assertThat(shopOwner.getRoles().stream().findFirst().orElseThrow().getName()).isEqualTo(RoleEnum.SHOP_OWNER);
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