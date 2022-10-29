package com.backend.spring.user.shopowner;

import com.backend.spring.shop.Address;
import com.backend.spring.user.role.RoleEnum;
import com.backend.spring.user.vehicleowner.Vehicle;
import com.backend.spring.user.vehicleowner.VehicleOwner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class ShopOwnerTest {
    @Autowired
    private ShopOwnerRepository shopOwnerRepository;

    @Autowired
    private TestEntityManager entityManager;

    private ShopOwner shopOwner;

    @BeforeEach
    void setUp() {
        Address address = new Address("Street", "StreetNum", "PostalCode", "City", "Prov");
        entityManager.persist(address);

        shopOwner = new ShopOwner("abc", "Bob", "bob@gmail.com", "416-123-1234", "bob", "password", "UofT Shop", address, "123", "email");
        entityManager.persist(shopOwner.getRole());
        entityManager.persist(shopOwner.getShop());
        entityManager.persist(shopOwner.getShop().getAddress());
        shopOwner = entityManager.persist(shopOwner);

        VehicleOwner vehicleOwner = new VehicleOwner("bob", "jack", "bob@gmail.com", "416-423-1423", "jack", "pass");
        entityManager.persist(vehicleOwner.getRole());
        vehicleOwner = entityManager.persist(vehicleOwner);

        Vehicle vehicle = new Vehicle(2022, "honda", "civic", "12345vin", "abcd435", vehicleOwner);
        entityManager.persist(vehicle);
    }

    @Test
    void checkShopOwnerSaved() {
        assertThat(shopOwnerRepository.save(shopOwner)).isEqualTo(shopOwner);
    }

    @Test
    void checkShopOwner() {
        assertThat(shopOwner.getFirstName()).isEqualTo("abc");
    }

    @Test
    void checkRole() {
        assertThat(shopOwner.getRole().getName()).isEqualTo(RoleEnum.SHOP_OWNER);
    }

    @Test
    void checkShop() {
        assertThat(shopOwner.getShop().getName()).isEqualTo("UofT Shop");
    }

    @Test
    void checkAddress() {
        assertThat(shopOwner.getShop().getAddress().getStreet()).isEqualTo("Street");
    }
}