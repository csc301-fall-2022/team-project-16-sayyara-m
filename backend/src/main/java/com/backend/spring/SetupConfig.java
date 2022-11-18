package com.backend.spring;

import com.backend.spring.entities.Address;
import com.backend.spring.entities.Appointment;
import com.backend.spring.entities.Quote;
import com.backend.spring.entities.Role;
import com.backend.spring.entities.RoleEnum;
import com.backend.spring.entities.Shop;
import com.backend.spring.entities.ShopOwner;
import com.backend.spring.entities.Vehicle;
import com.backend.spring.entities.VehicleOwner;
import com.backend.spring.repositories.AppointmentRepository;
import com.backend.spring.repositories.QuoteRepository;
import com.backend.spring.repositories.RoleRepository;
import com.backend.spring.repositories.ShopOwnerRepository;
import com.backend.spring.repositories.VehicleRepository;
import com.backend.spring.services.ShopOwnerSaveHelper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.LocalDateTime;

@Configuration
public class SetupConfig {

    @Bean
    @Profile("!test")
        // run on all profiles except test
    CommandLineRunner commandLineRunner(RoleRepository roleRepository, ShopOwnerSaveHelper shopOwnerSaveHelper, ShopOwnerRepository shopOwnerRepository, VehicleRepository vehicleRepository, AppointmentRepository appointmentRepository, QuoteRepository quoteRepository) {
        return args -> {
            roleRepository.save(new Role(RoleEnum.SHOP_OWNER));

            Address address = new Address("StreetNum", "Street", "PostalCode", "City", "Prov");

            Shop shop = new Shop("Sayyara Shop", address, "416-412-3123", "sayyara@gmail.com");

            ShopOwner shopOwner = new ShopOwner("abc", "Bob", "bob@gmail.com", "416-123-1234", "bob123", "Password1!", shop);
            shopOwner = shopOwnerSaveHelper.save(shopOwner, shop, address);

            VehicleOwner vehicleOwner = new VehicleOwner("jack", "fill", "jack@gmail.com", "416-142-5124");

            Vehicle vehicle = new Vehicle(2022, "Toyota", "Sienna", "4123114", "M2H0F2", vehicleOwner);
            vehicleOwner.setVehicle(vehicle);

            Appointment appointment = appointmentRepository.save(new Appointment(shop, vehicleOwner, LocalDateTime.of(2022, 11, 15, 15, 45), LocalDateTime.of(2022, 11, 15, 16, 30)));

            Quote quote = quoteRepository.save(new Quote(shop, vehicleOwner, "tires", 100.0, LocalDateTime.of(2022, 12, 1, 11, 59)));
            System.out.println(shopOwner);
            System.out.println(appointment);
            System.out.println(quote);
        };
    }

}
