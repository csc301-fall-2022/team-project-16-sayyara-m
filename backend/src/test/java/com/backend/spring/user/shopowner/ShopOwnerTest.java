package com.backend.spring.user.shopowner;

import com.backend.spring.address.Address;
import com.backend.spring.address.AddressRepository;
import com.backend.spring.shop.Shop;
import com.backend.spring.shop.ShopOwnerSaveHelper;
import com.backend.spring.shop.ShopRepository;
import com.backend.spring.user.role.Role;
import com.backend.spring.user.role.RoleEnum;
import com.backend.spring.user.role.RoleRepository;
import com.backend.spring.user.vehicleowner.VehicleOwner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.dao.DataIntegrityViolationException;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.fail;

@DataJpaTest
class ShopOwnerTest {
    @Autowired
    private ShopOwnerRepository shopOwnerRepository;

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private TestEntityManager entityManager;

    private ShopOwner shopOwner;
    private ShopOwner shopOwner1;

    private Role shopOwnerRole;

    private Shop shop;
    private com.backend.spring.address.Address address;

    private ShopOwnerSaveHelper saveHelper;

    @BeforeEach
    void setUp() {
        this.saveHelper = new ShopOwnerSaveHelper(shopOwnerRepository, shopRepository, addressRepository);

        Role shopOwnerRole = entityManager.persist(new Role(RoleEnum.SHOP_OWNER));
        Role vehicleOwnerRole = entityManager.persist(new Role(RoleEnum.VEHICLE_OWNER));

        address = new Address("StreetNum", "Street", "PostalCode", "City", "Prov");
        Address address2 = new Address("StreetNum", "Street", "PostalCode", "City", "Prov");


        shopOwner = new ShopOwner("abc", "Bob", "bob@gmail.com", "416-123-1234", "bob", "password", "UofT Shop", address, "123", "email", shopOwnerRole);
        entityManager.persist(shopOwner.getShop());
        address = entityManager.persist(shopOwner.getShop().getAddress());
        shopOwner = entityManager.persist(shopOwner);

        shopOwner1 = new ShopOwner("abc", "Bob", "bob2@gmail.com", "416-123-1234", "bob", "password", "UofT Shop2", address2, "123", "email", shopOwnerRole);
        entityManager.persist((shopOwner1.getShop()));
        address2 = entityManager.persist(shopOwner1.getShop().getAddress());
        shopOwner1 = entityManager.persist(shopOwner1);

        VehicleOwner vehicleOwner = new VehicleOwner("bob", "jack", "bob3@gmail.com", "416-423-1423", "jack", "pass", vehicleOwnerRole);
        vehicleOwner = entityManager.persist(vehicleOwner);

    }

    @Test
    void checkShopOwnerSaved() {
        assertThat(shopOwnerRepository.save(shopOwner)).isEqualTo(shopOwner);
    }

    @Test
    void checkShopsUnique() {
        shopOwner1 = new ShopOwner("abc", "Bob", "bob@gmail.com", "416-123-1234", "bob", "password", "UofT Shop", address, "123", "email", shopOwnerRole);
        shopOwner1 = entityManager.persist(shopOwner1);
        shopOwner1.setShop(entityManager.persist(shopOwner.getShop()));
        try {
            shopOwner = saveHelper.saveAndFlush(shopOwner);
            shopOwner1 = saveHelper.saveAndFlush(shopOwner1);
            fail("shops not unique");
        } catch (DataIntegrityViolationException ignored) {
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
        assertThat(shopOwner.getRole().getName()).isEqualTo(RoleEnum.SHOP_OWNER);
    }

    @Test
    void checkShopExists() {
        assertThat(shopOwner.getShop().getName()).isEqualTo("UofT Shop");
    }

    @Test
    void checkAddressExists() {
        assertThat(shopOwner.getShop().getAddress().getStreet()).isNotNull();
    }
}