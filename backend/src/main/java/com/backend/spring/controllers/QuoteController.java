package com.backend.spring.controllers;

import com.backend.spring.entities.Quote;
import com.backend.spring.services.QuoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@CrossOrigin
@RequestMapping(path = "quotes")
public class QuoteController {
    private final QuoteService service;

    @Autowired
    public QuoteController(QuoteService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Quote>> getAllQuotes(@RequestHeader(AUTHORIZATION) String authorizationHeader) {
        return ResponseEntity.ok(service.getAllQuotes(authorizationHeader));
    }

    @GetMapping(path = "{quoteId}")
    public ResponseEntity<Quote> getQuote(@PathVariable long quoteId) {
        return ResponseEntity.ok(service.getQuote(quoteId));
    }

    @PostMapping
    public Quote createQuote(@RequestBody Quote quote) {
        return service.createQuote(quote);
    }

    @DeleteMapping(path = "{quote_id}")
    public void deleteQuote(@PathVariable("quote_id") long id) {
        service.deleteQuote(id);
    }

    @PutMapping(path = "{quote_id}")
    public void updateQuote(@PathVariable("quote_id") Long id,
                            @RequestParam(required = false) Double price,
                            @RequestParam(required = false) LocalDateTime expiryDate) {
        service.updateQuote(id, price, expiryDate);
    }
}
