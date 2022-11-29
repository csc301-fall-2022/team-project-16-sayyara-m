package com.backend.spring.services;

import com.backend.spring.entities.Quote;
import com.backend.spring.entities.Shop;
import com.backend.spring.entities.VehicleOwner;
import com.backend.spring.exceptions.DataNotFoundException;
import com.backend.spring.exceptions.ForbiddenException;
import com.backend.spring.repositories.QuoteRepository;
import com.backend.spring.repositories.ShopRepository;
import com.backend.spring.repositories.VehicleOwnerRepository;
import com.backend.spring.validators.QuoteValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleOwnerService {
    private final VehicleOwnerRepository vehicleOwnerRepository;

    private final VehicleOwnerSaveHelper vehicleOwnerSaveHelper;

    private final ShopRepository shopRepository;

    private final QuoteRepository quoteRepository;

    public List<Quote> getAllQuotes(long id) {
        return vehicleOwnerRepository
                .findById(id)
                .orElseThrow(() -> new DataNotFoundException("Vehicle owner with id " + id + " not found."))
                .getQuotes();
    }

    public Quote createQuote(Quote quote) {
        new QuoteValidator(quote).validate();

        Shop shop = shopRepository.findById(quote.getShopId())
                .orElseThrow(() -> new DataNotFoundException("Shop with id " + quote.getShopId() + " not found."));

        checkServiceInShopIsNotNull(quote.getServiceName(), shop);

        quote.setShop(shop);
        quote.setService(new com.backend.spring.entities.Service(quote.getServiceName()));

        Optional<VehicleOwner> savedVehicleOwner = vehicleOwnerRepository
                .findByEmail(quote.getVehicleOwner().getEmail());
        VehicleOwner vehicleOwner;
        if (savedVehicleOwner.isPresent()) {
            vehicleOwner = savedVehicleOwner.get();
            addQuoteToVehicleOwner(quote, vehicleOwner);
        } else {
            vehicleOwner = quote.getVehicleOwner();
            vehicleOwner.getQuotes().add(quote);
            vehicleOwner = vehicleOwnerSaveHelper.save(vehicleOwner);
        }

        return vehicleOwner
                .getQuotes()
                .stream()
                .filter(curQuote -> curQuote.equals(quote))
                .findFirst()
                .orElseThrow(() -> new ForbiddenException("Something went wrong while creating the Quote"));
    }

    @Transactional
    void addQuoteToVehicleOwner(Quote quote, VehicleOwner vehicleOwner) {
        vehicleOwner.getQuotes().add(quote);
        quote.setVehicleOwner(vehicleOwner);
        quoteRepository.save(quote);
    }

    private void checkServiceInShopIsNotNull(String serviceName, Shop shop) {
        if (shop.getServices()
                .stream()
                .anyMatch(shopService -> shopService.getName().equals(serviceName) && shopService.getDefaultPrice() != null))
            throw new DataNotFoundException("Shop already has a default price for the service " + serviceName + ". Consider booking an appointment instead.");
    }
}
