package com.backend.spring.controllers;

import com.backend.spring.entities.Quote;
import com.backend.spring.services.VehicleOwnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "vehicleOwner")
@RequiredArgsConstructor
public class VehicleOwnerController {
    private final VehicleOwnerService vehicleOwnerService;

    @GetMapping("{vehicleOwnerId}/quotes")
    public ResponseEntity<List<Quote>> getAllQuotes(@PathVariable long vehicleOwnerId) {
        return ResponseEntity.ok().body(vehicleOwnerService.getAllQuotes(vehicleOwnerId));
    }

    @PostMapping("quotes")
    public ResponseEntity<Quote> createQuote(@RequestBody Quote quote) throws URISyntaxException {
        return ResponseEntity.created(new URI("/api/quotes/" + quote.getId())).body(vehicleOwnerService.createQuote(quote));
    }
}
