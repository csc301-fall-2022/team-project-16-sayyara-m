package com.backend.spring;

import com.backend.spring.address.AddressRepository;
import com.backend.spring.shop.ShopRepository;
import com.backend.spring.user.appuser.AppUserRepository;
import com.backend.spring.user.role.Role;
import com.backend.spring.user.role.RoleEnum;
import com.backend.spring.user.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(AppUserRepository appUserRepository, RoleRepository roleRepository, ShopRepository shopRepository, AddressRepository addressRepository) {
        return args -> {

            roleRepository.save(new Role(RoleEnum.SHOP_OWNER));
            roleRepository.save(new Role(RoleEnum.VEHICLE_OWNER));

//            Address address = new Address("Street", "StreetNum", "PostalCode", "City", "Prov");
//
//
//            ShopOwner shopOwner = new ShopOwner("abc", "Bob", "bob@gmail.com", "416-123-1234", "bob", "password", address, "123", "email");
//            roleRepository.save(shopOwner.getRole());
//            shopRepository.save(shopOwner.getShop());
//            addressRepository.save(shopOwner.getShop().getAddress());
//            shopOwner = appUserRepository.save(shopOwner);
//
//            VehicleOwner vehicleOwner = new VehicleOwner("bob", "jack", "bob@gmail.com", "416-423-1423", "jack", "pass");
//            roleRepository.save(vehicleOwner.getRole());
//            vehicleOwner = appUserRepository.save(vehicleOwner);
//
//            System.out.println(vehicleOwner);
//            System.out.println(shopOwner);
        };
    }
}
