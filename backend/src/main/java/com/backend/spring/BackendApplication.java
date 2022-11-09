package com.backend.spring;

import com.backend.spring.address.Address;
import com.backend.spring.shop.Shop;
import com.backend.spring.user.role.Role;
import com.backend.spring.user.role.RoleEnum;
import com.backend.spring.user.role.RoleRepository;
import com.backend.spring.user.shopowner.ShopOwner;
import com.backend.spring.user.shopowner.ShopOwnerSaveHelper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(RoleRepository roleRepository, ShopOwnerSaveHelper shopOwnerSaveHelper) {
        return args -> {
            Set<Role> roles = new HashSet<>(Set.of(new Role(RoleEnum.SHOP_OWNER), new Role(RoleEnum.VEHICLE_OWNER)));
            roleRepository.saveAll(roles);

            Address address = new Address("StreetNum", "Street", "PostalCode", "City", "Prov");

            Shop shop = new Shop("Sayyara Shop", address, "416-412-3123", "sayyara@gmail.com");

            ShopOwner shopOwner = new ShopOwner("abc", "Bob", "bob@gmail.com", "416-123-1234", "bob123", "password");
            shopOwner = shopOwnerSaveHelper.save(shopOwner, shop, address);

            System.out.println("====");
            System.out.println(shopOwner);
        };
    }
}
