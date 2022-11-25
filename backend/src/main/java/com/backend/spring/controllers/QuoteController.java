package com.backend.spring.controllers;

import com.backend.spring.entities.Quote;
import com.backend.spring.exceptions.InvalidDataException;
import com.backend.spring.services.QuoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@CrossOrigin
@RequestMapping(path = "quotes")
@RequiredArgsConstructor
public class QuoteController {
    private final QuoteService quoteService;

    @GetMapping
    public ResponseEntity<List<Quote>> getAllQuotes(@RequestHeader(AUTHORIZATION) String authorizationHeader) {
        return ResponseEntity.ok(quoteService.getAllQuotes(authorizationHeader));
    }

    @GetMapping(path = "{quoteId}")
    public ResponseEntity<Quote> getQuote(@PathVariable long quoteId) {
        return ResponseEntity.ok(quoteService.getQuote(quoteId));
    }

    @DeleteMapping(path = "{quote_id}")
    public void deleteQuote(@PathVariable("quote_id") long id) {
        quoteService.deleteQuote(id);
    }

    @PatchMapping(path = "{quote_id}")
    public ResponseEntity<Quote> updateQuote(@PathVariable("quote_id") long id,
                                             @RequestParam("status") String status,
                                             @RequestHeader(AUTHORIZATION) String authorizationHeader) {
        return ResponseEntity.ok(quoteService.updateQuoteStatus(id, status, authorizationHeader));
    }
}
