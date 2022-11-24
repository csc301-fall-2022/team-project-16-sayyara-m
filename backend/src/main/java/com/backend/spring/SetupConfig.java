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

    private final String[] firstNames = {"John", "Jane", "Bob", "Alice", "Joe", "Mary", "Tom", "Sally", "Bill", "Sarah"};
    private final String[] lastNames = {"Smith", "Jones", "Brown", "Wilson", "Davis", "Miller", "Taylor", "Anderson", "Thomas", "Jackson"};
    private final String[] usernames = {"bob123", "johnsmith", "janejones", "bobbrown", "alicewilson", "joedavis", "marymiller", "tomtaylor", "sallyanderson", "billthomas", "sarahjackson"};
    private final String PASSWORD = "Password1!";
    private final String[] emails = {"bob@gmail.com", "johnsmith@gmail.com", "janejones@gmail.com", "bobbrown@gmail.com", "alicewilson@gmail.com", "joedavis@gmail.com", "marymiller@gmail.com", "tomtaylor@gmail.com", "sallyanderson@gmail.com", "billthomas@gmail.com", "sarahjackson@gmail.com"};
    private final String[] canadianPhoneNumbers = {"+14164513123", "+14164513124", "+14164513125", "+14164513126", "+14164513127", "+14164513128", "+14164513129", "+14164513130", "+14164513131", "+14164513132"};

    private final String[] streetNumbers = {"123", "456", "789", "101", "112", "131", "151", "161", "171", "181"};
    private final String[] canadianStreetNames = {"Bloor St", "Yonge St", "Queen St", "King St", "Dundas St", "Spadina Ave", "College St", "Ossington Ave", "Dufferin St", "Dupont St"};
    private final String[] canadianPostalCodes = {"M5V 2T6", "M5V 2T7", "M5V 2T8", "M5V 2T9", "M5V 2T0", "M5V 2T1", "M5V 2T2", "M5V 2T3", "M5V 2T4", "M5V 2T5"};
    private final String[] canadianCityNames = {"Toronto", "Ottawa", "Montreal", "Vancouver", "Calgary", "Edmonton", "Winnipeg", "Quebec City", "Hamilton", "Halifax"};
    private final String[] canadianProvinceNames = {"Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Quebec", "Nova Scotia"};

    // vehicles
    private final String[] vehicleMakes = {"Honda", "Toyota", "Ford", "Chevrolet", "Nissan", "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Kia"};
    private final String[] vehicleModels = {"Civic", "Corolla", "Fiesta", "Cruze", "Sentra", "3 Series", "C-Class", "A4", "Jetta", "Soul"};
    private final int[] vehicleYears = {2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019};
    private final String[] vehicleLicencePlates = {"ABC123", "DEF456", "GHI789", "JKL012", "MNO345", "PQR678", "STU901", "VWX234", "YZA567", "BCD890"};
    private final String[] vehicleVinNumbers = {"1G1ZB5ST1GF285867", "1G1ZB5ST1GF285868", "1G1ZB5ST1GF285869", "1G1ZB5ST1GF285870", "1G1ZB5ST1GF285871", "1G1ZB5ST1GF285872", "1G1ZB5ST1GF285873", "1G1ZB5ST1GF285874", "1G1ZB5ST1GF285875", "1G1ZB5ST1GF285876"};

    private final String[] serviceNames = {"Oil Change", "Tire Rotation", "Brake Inspection", "Tire Replacement", "Battery Replacement"};

    private final String[] shopNames = {"Auto Repair Shop", "Auto Body Shop", "Auto Detailing Shop", "Auto Parts Shop", "Auto Accessories Shop"};

    private final int NUM_SERVICES = serviceNames.length;
    private final int NUM_SHOPS = shopNames.length;
    private final int NUM_VEHICLES = vehicleLicencePlates.length;
    private final int NUM_APPOINTMENTS = 20;

    @Bean
    @Profile("!test")
        // run on all profiles except test
    CommandLineRunner commandLineRunner(RoleRepository roleRepository, AddressRepository addressRepository, ShopRepository shopRepository, VehicleOwnerRepository vehicleOwnerRepository, ShopOwnerSaveHelper shopOwnerSaveHelper, VehicleRepository vehicleRepository, AppointmentRepository appointmentRepository, QuoteRepository quoteRepository, ServiceRepository serviceRepository) {
        return args -> {
            System.out.println("Inserting data...");

            roleRepository.save(new Role(RoleEnum.SHOP_OWNER));

            // Services
            List<Service> services = new ArrayList<>();
            int i = 0;
            while (i < NUM_SERVICES) {
                Service service = new Service(serviceNames[i], null);
                services.add(service);
                i++;
            }
            serviceRepository.saveAll(services);

            // Shops and shop owners
            List<Shop> shops = new ArrayList<>();
            i = 0;
            while (i < NUM_SHOPS) {
                Address address = new Address(streetNumbers[i], canadianStreetNames[i], canadianCityNames[i], canadianProvinceNames[i], canadianPostalCodes[i]);

                Shop shop = new Shop(shopNames[i], address, canadianPhoneNumbers[i], "shop_" + emails[i]);
                List<Service> shopServices = new ArrayList<>();
                int j = 0;
                while (j < 3) {
                    shopServices.add(services.get(ThreadLocalRandom.current().nextInt(0, NUM_SERVICES)));
                    j++;
                }
                shop.setServices(shopServices);
                shops.add(shop);

                ShopOwner shopOwner = new ShopOwner(firstNames[i], lastNames[i], "so_" + emails[i], canadianPhoneNumbers[i], usernames[i], PASSWORD, shop);
                shopOwnerSaveHelper.save(shopOwner, shop, address);

                i++;
            }

            // Vehicle owners
            List<VehicleOwner> vehicleOwners = new ArrayList<>();
            i = 0;
            while (i < NUM_VEHICLES) {

                VehicleOwner vehicleOwner = new VehicleOwner(firstNames[i], lastNames[i], "vo_" + emails[i], canadianPhoneNumbers[i]);

                Vehicle vehicle = new Vehicle(vehicleYears[i], vehicleMakes[i], vehicleModels[i], vehicleVinNumbers[i], vehicleLicencePlates[i], vehicleOwner);

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

                // Service
                randomInt = ThreadLocalRandom.current().nextInt(0, randomShop.getServices().size());
                Service randomService = randomShop.getServices().get(randomInt);

                Appointment appointment = appointmentRepository.save(new Appointment(randomShop, randomVehicleOwner, randomStartDate, randomEndDate, randomService));

                // Quote
                double randomPrice = ThreadLocalRandom.current().nextDouble(0, 1000.00);

                Quote quote = quoteRepository.save(new Quote(randomShop, randomVehicleOwner, randomService, randomPrice, randomEndDate));

                i++;
            }
            System.out.println("Data inserted.");
        };
    }

}
