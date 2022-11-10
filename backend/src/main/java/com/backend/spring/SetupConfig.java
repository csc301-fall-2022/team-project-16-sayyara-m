package com.backend.spring;

import com.backend.spring.address.Address;
import com.backend.spring.appointment.Appointment;
import com.backend.spring.appointment.AppointmentRepository;
import com.backend.spring.quote.Quote;
import com.backend.spring.quote.QuoteRepository;
import com.backend.spring.shop.Shop;
import com.backend.spring.user.role.Role;
import com.backend.spring.user.role.RoleEnum;
import com.backend.spring.user.role.RoleRepository;
import com.backend.spring.user.shopowner.ShopOwner;
import com.backend.spring.user.shopowner.ShopOwnerRepository;
import com.backend.spring.user.shopowner.ShopOwnerSaveHelper;
import com.backend.spring.user.vehicleowner.VehicleOwner;
import com.backend.spring.user.vehicleowner.VehicleOwnerRepository;
import com.backend.spring.vehicle.Vehicle;
import com.backend.spring.vehicle.VehicleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Configuration
public class SetupConfig {

    @Bean
    @Profile("!test") // run on all profiles except test
    CommandLineRunner commandLineRunner(PasswordEncoder passwordEncoder, RoleRepository roleRepository, ShopOwnerSaveHelper shopOwnerSaveHelper, ShopOwnerRepository shopOwnerRepository, VehicleRepository vehicleRepository, VehicleOwnerRepository vehicleOwnerRepository, AppointmentRepository appointmentRepository, QuoteRepository quoteRepository) {
        return args -> {
            Set<Role> roles = new HashSet<>(Set.of(new Role(RoleEnum.SHOP_OWNER), new Role(RoleEnum.VEHICLE_OWNER)));
            roleRepository.saveAll(roles);

            Address address = new Address("StreetNum", "Street", "PostalCode", "City", "Prov");

            Shop shop = new Shop("Sayyara Shop", address, "416-412-3123", "sayyara@gmail.com");

            ShopOwner shopOwner = new ShopOwner("abc", "Bob", "bob@gmail.com", "416-123-1234", "bob123", "password", shop);
            shopOwner = shopOwnerSaveHelper.save(shopOwner, shop, address);

            VehicleOwner vehicleOwner = new VehicleOwner("jack", "fill", "jack@gmail.com", "416-142-5124", "jackfill", "password");
            vehicleOwner.setPassword(passwordEncoder.encode(vehicleOwner.getPassword()));
            vehicleOwner.addRole(roleRepository.findByName(RoleEnum.VEHICLE_OWNER.getValue()));

            Vehicle vehicle = new Vehicle(2022, "Toyota", "Sienna", "4123114", "M2H0F2", vehicleOwner);
            vehicleOwner.setVehicle(vehicle);

            Quote quote = new Quote(shop, vehicleOwner, "tires", 100.0, LocalDateTime.of(2022, 12, 1, 11, 59));

            Appointment appointment = appointmentRepository.save(new Appointment(shop, vehicleOwner, LocalDateTime.of(2022, 11, 15, 15, 45), LocalDateTime.of(2022, 11, 15, 16, 30)));
            System.out.println(shopOwner);
            System.out.println(appointment);
        };
    }

}
