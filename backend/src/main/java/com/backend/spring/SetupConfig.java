package com.backend.spring;

import com.backend.spring.entities.Address;
import com.backend.spring.entities.Appointment;
import com.backend.spring.entities.Quote;
import com.backend.spring.entities.QuoteStatus;
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
import com.backend.spring.repositories.VehicleRepository;
import com.backend.spring.services.ShopOwnerSaveHelper;
import com.backend.spring.services.VehicleOwnerSaveHelper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

@Configuration
public class SetupConfig {

    private final String[] firstNames = {"John", "Jane", "Bob", "Alice", "Joe", "Mary", "Tom", "Sally", "Bill", "Sarah"};
    private final String[] lastNames = {"Smith", "Jones", "Brown", "Wilson", "Davis", "Miller", "Taylor", "Anderson", "Thomas", "Jackson"};
    private final String[] usernames = {"bob12345", "johnsmith", "janejones", "bobbrown", "alicewilson", "joedavis", "marymiller", "tomtaylor", "sallyanderson", "billthomas", "sarahjackson"};
    private final String PASSWORD = "Password1!";
    private final String[] emails = {"bob@gmail.com", "johnsmith@gmail.com", "janejones@gmail.com", "bobbrown@gmail.com", "alicewilson@gmail.com", "joedavis@gmail.com", "marymiller@gmail.com", "tomtaylor@gmail.com", "sallyanderson@gmail.com", "billthomas@gmail.com", "sarahjackson@gmail.com"};
    private final String[] canadianPhoneNumbers = {"+14164513123", "+14164513124", "+14164513125", "+14164513126", "+14164513127", "+14164513128", "+14164513129", "+14164513130", "+14164513131", "+14164513132"};

    private final String[] streetNumbers = {"123", "456", "789", "101", "112", "131", "151", "161", "171", "181"};
    private final String[] canadianStreetNames = {"Bloor St", "Yonge St", "Queen St", "King St", "Dundas St", "Spadina Ave", "College St", "Ossington Ave", "Dufferin St", "Dupont St"};
    private final String[] canadianPostalCodes = {"M5V 2T6", "M5V 2T7", "M5V 2T8", "M5V 2T9", "M5V 2T0", "M5V 2T1", "M5V 2T2", "M5V 2T3", "M5V 2T4", "M5V 2T5"};
    private final String[] canadianCityNames = {"Toronto", "Ottawa", "Montreal", "Vancouver", "Calgary", "Edmonton", "Winnipeg", "Quebec City", "Hamilton", "Halifax"};
    private final String[] canadianProvinceNames = {"Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Quebec", "Nova Scotia", "New Brunswick", "Newfoundland and Labrador", "Prince Edward Island"};

    // vehicles
    private final String[] vehicleMakes = {"Honda", "Toyota", "Ford", "Chevrolet", "Nissan", "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Kia"};
    private final String[] vehicleModels = {"Civic", "Corolla", "Fiesta", "Cruze", "Sentra", "3 Series", "C-Class", "A4", "Jetta", "Soul"};
    private final int[] vehicleYears = {2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020};
    private final String[] vehicleLicencePlates = {"ABC123", "DEF456", "GHI789", "JKL012", "MNO345", "PQR678", "STU901", "VWX234", "YZA567", "BCD890"};
    private final String[] vehicleVinNumbers = {"1G1ZB5ST1GF285867", "1G1ZB5ST1GF285868", "1G1ZB5ST1GF285869", "1G1ZB5ST1GF285870", "1G1ZB5ST1GF285871", "1G1ZB5ST1GF285872", "1G1ZB5ST1GF285873", "1G1ZB5ST1GF285874", "1G1ZB5ST1GF285875", "1G1ZB5ST1GF285876"};

    private final String[] serviceNames = {"Oil Change", "Tire Rotation", "Brake Inspection", "Tire Replacement", "Battery Replacement", "Wheel Alignment", "Wheel Balancing", "Engine Tune-Up", "Engine Repair", "Transmission Repair"};

    // request quote descriptions
    private final String[] requestQuoteDescriptions = {"My bumper is broken and needs to be fixed!", "I need an oil change", "I need a tire rotation", "I need a brake inspection", "I need a tire replacement", "I need a battery replacement", "I need a wheel alignment", "I need a wheel balancing", "I need an engine tune-up", "I need an engine repair", "I need a transmission repair"};
    private final Double[] prices = {99.99, 45.99, 25.99, null, 35.99, 15.99, null, 55.99, 85.99, 95.99, 105.99};

    private final String[] shopNames = {"Bob's Auto Shop", "John's Auto Shop", "Jane's Auto Shop", "Alice's Auto Shop", "Joe's Auto Shop", "Mary's Auto Shop", "Tom's Auto Shop", "Sally's Auto Shop", "Bill's Auto Shop", "Sarah's Auto Shop"};

    private final int NUM_SERVICES = serviceNames.length;
    private final int NUM_SHOPS = shopNames.length;
    private final int NUM_VEHICLES = vehicleLicencePlates.length;
    private final int NUM_APPOINTMENTS = 20;

    @Bean
    @Profile("dev")
    CommandLineRunner commandLineRunner(RoleRepository roleRepository,
                                        AddressRepository addressRepository,
                                        ShopRepository shopRepository,
                                        VehicleOwnerSaveHelper vehicleOwnerSaveHelper,
                                        ShopOwnerSaveHelper shopOwnerSaveHelper,
                                        VehicleRepository vehicleRepository,
                                        AppointmentRepository appointmentRepository,
                                        QuoteRepository quoteRepository,
                                        ServiceRepository serviceRepository) {
        return args -> {
            System.out.println("Inserting data...");

            roleRepository.save(new Role(RoleEnum.SHOP_OWNER));

            // Shops and shop owners
            int i = 0;
            while (i < NUM_SHOPS) {
                Address address = new Address(streetNumbers[i], canadianStreetNames[i], canadianCityNames[i], canadianProvinceNames[i], canadianPostalCodes[i]);

                List<Service> serviceList = new ArrayList<>();
                for (String serviceName : serviceNames)
                    serviceList.add(new Service(serviceName, prices[new Random().nextInt(prices.length)]));

                Shop shop = new Shop(shopNames[i], address, canadianPhoneNumbers[i], "shop_" + emails[i], serviceList);

                ShopOwner shopOwner = new ShopOwner(firstNames[i], lastNames[i], "so_" + emails[i], canadianPhoneNumbers[i], usernames[i], PASSWORD, shop);
                shopOwner = shopOwnerSaveHelper.save(shopOwner);

                i++;
            }

            // Vehicle owners
            List<VehicleOwner> vehicleOwners = new ArrayList<>();
            i = 0;
            while (i < NUM_VEHICLES) {
                Vehicle vehicle = new Vehicle(vehicleYears[i], vehicleMakes[i], vehicleModels[i], vehicleVinNumbers[i], vehicleLicencePlates[i], firstNames[i] + " " + lastNames[i]);

                VehicleOwner vehicleOwner = new VehicleOwner(firstNames[i], lastNames[i], "vo_" + emails[i], canadianPhoneNumbers[i], vehicle);

                vehicleOwner.setVehicle(vehicle);
                vehicleOwnerSaveHelper.save(vehicleOwner);
                vehicleOwners.add(vehicleOwner);

                i++;
            }

            List<Shop> shops = shopRepository.findAll();
            i = 0;
            while (i < NUM_APPOINTMENTS) {
                // Shop
                int randomInt;
                Shop randomShop = shops.get(i % shops.size());

                // Vehicle owner
                randomInt = ThreadLocalRandom.current().nextInt(0, NUM_VEHICLES);
                VehicleOwner randomVehicleOwner = vehicleOwners.get(randomInt);

                // Appointment
                long minStartEpoch = LocalDateTime.now().toEpochSecond(ZoneOffset.UTC);
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

                Appointment appointment = new Appointment(randomShop, randomVehicleOwner, randomStartDate, randomEndDate, randomService, prices[i % prices.length]);

                // Quote
                String randomDescription = requestQuoteDescriptions[i % requestQuoteDescriptions.length];
                Double randomPrice = prices[i % prices.length];
                Quote quote = new Quote(randomShop, randomVehicleOwner, randomService, randomPrice, randomDescription);
                quote.setStatus(randomPrice == null ? QuoteStatus.PENDING_REVIEW : QuoteStatus.PENDING_APPROVAL);

                randomVehicleOwner.getAppointments().add(appointment);
                randomVehicleOwner.getQuotes().add(quote);
                vehicleOwnerSaveHelper.save(randomVehicleOwner);
                i++;
            }
            System.out.println("Data inserted.");
        };
    }

}
