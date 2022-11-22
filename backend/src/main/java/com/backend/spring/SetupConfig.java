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
import com.backend.spring.repositories.VehicleOwnerRepository;
import com.backend.spring.repositories.VehicleRepository;
import com.backend.spring.services.ShopOwnerSaveHelper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Configuration
public class SetupConfig {

    @Bean
    @Profile("!test")
        // run on all profiles except test
    CommandLineRunner commandLineRunner(RoleRepository roleRepository, VehicleOwnerRepository vehicleOwnerRepository, ShopOwnerSaveHelper shopOwnerSaveHelper, ShopOwnerRepository shopOwnerRepository, VehicleRepository vehicleRepository, AppointmentRepository appointmentRepository, QuoteRepository quoteRepository) {
        return args -> {
            roleRepository.save(new Role(RoleEnum.SHOP_OWNER));

            Address address = new Address("StreetNum", "Street", "PostalCode", "City", "Prov");

            Shop shop = new Shop("Sayyara Shop", address, "416-412-3123", "sayyara@gmail.com");

            ShopOwner shopOwner = new ShopOwner("abc", "Bob", "bob@gmail.com", "416-123-1234", "bob123", "Password1!", shop);
            shopOwner = shopOwnerSaveHelper.save(shopOwner, shop, address);

            VehicleOwner vehicleOwner = new VehicleOwner("jack", "fill", "jack@gmail.com", "416-142-5124");

            Vehicle vehicle = new Vehicle(2022, "Toyota", "Sienna", "4123114", "M2H0F2", vehicleOwner);
            vehicleOwner.setVehicle(vehicle);

            vehicleOwnerRepository.save(vehicleOwner);

            int i = 0;
            while (i < 20) {
                i++;

                // Appointments
                long minStartEpoch = LocalDateTime.of(2022, 1, 1, 0, 0).toEpochSecond(ZoneOffset.UTC);
                long maxStartEpoch = LocalDateTime.of(2023, 12, 31, 23, 59).toEpochSecond(ZoneOffset.UTC);
                long randomStartEpoch = ThreadLocalRandom.current().nextLong(minStartEpoch, maxStartEpoch);
                LocalDateTime randomStartDate = LocalDateTime.ofEpochSecond(randomStartEpoch, 0, ZoneOffset.UTC);

                long minEndEpoch = randomStartDate.plusMinutes(15).toEpochSecond(ZoneOffset.UTC);
                long maxEndEpoch = randomStartDate.plusHours(1).toEpochSecond(ZoneOffset.UTC);
                long randomEndEpoch = ThreadLocalRandom.current().nextLong(minEndEpoch, maxEndEpoch);
                LocalDateTime randomEndDate = LocalDateTime.ofEpochSecond(randomEndEpoch, 0, ZoneOffset.UTC);

                Appointment appointment = appointmentRepository.save(new Appointment(shop, vehicleOwner, randomStartDate, randomEndDate));

                // Quotes
                List<String> serviceTypes = Arrays.asList("Oil change", "Change tires", "Rotate tires", "Spark plugs", "Air filter");
                int randomInt = ThreadLocalRandom.current().nextInt(0, serviceTypes.size());
                String randomService = serviceTypes.get(randomInt);

                double randomPrice = ThreadLocalRandom.current().nextDouble(0, 1000.00);

                Quote quote = quoteRepository.save(new Quote(shop, vehicleOwner, randomService, randomPrice, randomEndDate));

            }
        };
    }

}
