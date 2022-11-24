package com.backend.spring;

import com.backend.spring.entities.Address;
import com.backend.spring.entities.Appointment;
import com.backend.spring.entities.Quote;
import com.backend.spring.entities.Role;
import com.backend.spring.entities.RoleEnum;
import com.backend.spring.entities.Service;
import com.backend.spring.entities.Shop;
import com.backend.spring.entities.ShopOwner;
import com.backend.spring.entities.Vehicle;
import com.backend.spring.entities.VehicleOwner;
import com.backend.spring.repositories.AddressRepository;
import com.backend.spring.repositories.AppointmentRepository;
import com.backend.spring.repositories.QuoteRepository;
import com.backend.spring.repositories.RoleRepository;
import com.backend.spring.repositories.ServiceRepository;
import com.backend.spring.repositories.ShopOwnerRepository;
import com.backend.spring.repositories.ShopRepository;
import com.backend.spring.repositories.VehicleOwnerRepository;
import com.backend.spring.repositories.VehicleRepository;
import com.backend.spring.services.ShopOwnerSaveHelper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Configuration
public class SetupConfig {
    int NUM_SERVICES = 5;
    int NUM_SHOPS = 5;
    int NUM_VEHICLES = 10;
    int NUM_APPOINTMENTS = 20;

    @Bean
    @Profile("!test")
        // run on all profiles except test
    CommandLineRunner commandLineRunner(RoleRepository roleRepository,
                                        AddressRepository addressRepository,
                                        ShopRepository shopRepository,
                                        VehicleOwnerRepository vehicleOwnerRepository,
                                        ShopOwnerSaveHelper shopOwnerSaveHelper,
                                        VehicleRepository vehicleRepository,
                                        AppointmentRepository appointmentRepository,
                                        QuoteRepository quoteRepository,
                                        ServiceRepository serviceRepository) {
        return args -> {
            roleRepository.save(new Role(RoleEnum.SHOP_OWNER));

            // Services
            List<Service> services = new ArrayList<>();
            int i = 0;
            while (i < NUM_SERVICES) {
                Service service = serviceRepository.save(new Service("Service " + i, null));
                services.add(service);

                i++;
            }

            // Shops and shop owners
            List<Shop> shops = new ArrayList<>();
            i = 0;
            while (i < NUM_SHOPS) {
                Address address = addressRepository.save(new Address(
                        "ShopStreetNum" + i,
                        "ShopStreet" + i,
                        "ShopPostalCode" + i,
                        "ShopCity" + i,
                        "ShopProv" + i));

                Shop shop = new Shop(
                        "Shop" + i,
                        address,
                        "123-456-789" + i,
                        "shop" + i + "@gmail.com");
                List<Service> shopServices = new ArrayList<>();
                int j = 0;
                while (j < 3) {
                    shopServices.add(services.get(ThreadLocalRandom.current().nextInt(0, NUM_SERVICES)));
                    j++;
                }
                shop.setServices(shopServices);
                shopRepository.save(shop);
                shops.add(shop);

                ShopOwner shopOwner = new ShopOwner(
                        "ShopOwnerFirst" + i,
                        "ShopOwnerLast" + i,
                        "shopowner" + i + "@gmail.com",
                        "987-654-321" + i,
                        "shopOwnerUsername" + i,
                        "shopOwnerPassword" + i,
                        shop);
                shopOwnerSaveHelper.save(shopOwner, shop, address);

                i++;
            }

            // Vehicle owners
            List<VehicleOwner> vehicleOwners = new ArrayList<>();
            i = 0;
            while (i < NUM_VEHICLES) {
                VehicleOwner vehicleOwner = new VehicleOwner(
                        "VehicleOwnerFirst" + i,
                        "VehicleOwnerLast" + i,
                        "vehicleowner" + i + "@gmail.com",
                        "456-123-789" + i);

                Vehicle vehicle = vehicleRepository.save(new Vehicle(
                        2000 + i,
                        "VehicleMake" + i,
                        "VehicleModel" + i,
                        "VehicleVin" + i,
                        "VehiclePlate" + i,
                        vehicleOwner));

                vehicleOwner.setVehicle(vehicle);
                vehicleOwnerRepository.save(vehicleOwner);
                vehicleOwners.add(vehicleOwner);

                i++;
            }

            i = 0;
            while (i < NUM_APPOINTMENTS) {
                // Shop
                int randomInt = ThreadLocalRandom.current().nextInt(0, NUM_SHOPS);
                Shop randomShop = shops.get(randomInt);

                // Vehicle owner
                randomInt = ThreadLocalRandom.current().nextInt(0, NUM_VEHICLES);
                VehicleOwner randomVehicleOwner = vehicleOwners.get(randomInt);

                // Appointment
                long minStartEpoch = LocalDateTime.of(2022, 1, 1, 0, 0).toEpochSecond(ZoneOffset.UTC);
                long maxStartEpoch = LocalDateTime.of(2023, 12, 31, 23, 59).toEpochSecond(ZoneOffset.UTC);
                long randomStartEpoch = ThreadLocalRandom.current().nextLong(minStartEpoch, maxStartEpoch);
                LocalDateTime randomStartDate = LocalDateTime.ofEpochSecond(randomStartEpoch, 0, ZoneOffset.UTC);

                long minEndEpoch = randomStartDate.plusMinutes(15).toEpochSecond(ZoneOffset.UTC);
                long maxEndEpoch = randomStartDate.plusHours(1).toEpochSecond(ZoneOffset.UTC);
                long randomEndEpoch = ThreadLocalRandom.current().nextLong(minEndEpoch, maxEndEpoch);
                LocalDateTime randomEndDate = LocalDateTime.ofEpochSecond(randomEndEpoch, 0, ZoneOffset.UTC);

                Appointment appointment = appointmentRepository.save(new Appointment(randomShop, randomVehicleOwner, randomStartDate, randomEndDate));

                // Service
                randomInt = ThreadLocalRandom.current().nextInt(0, randomShop.getServices().size());
                Service randomService = randomShop.getServices().get(randomInt);

                // Quote
                double randomPrice = ThreadLocalRandom.current().nextDouble(0, 1000.00);

                Quote quote = quoteRepository.save(new Quote(randomShop, randomVehicleOwner, randomService, randomPrice, randomEndDate));

                i++;
            }
        };
    }

}
