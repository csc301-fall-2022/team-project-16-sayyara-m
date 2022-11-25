package com.backend.spring.services;

import com.backend.spring.entities.Quote;
import com.backend.spring.entities.QuoteStatus;
import com.backend.spring.exceptions.DataNotFoundException;
import com.backend.spring.exceptions.ViolatedConstraintException;
import com.backend.spring.repositories.QuoteRepository;
import com.backend.spring.repositories.ShopRepository;
import com.backend.spring.repositories.VehicleOwnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuoteService {
    private final QuoteRepository quoteRepository;

    private final ShopOwnerRetriever shopOwnerRetriever;

    public List<Quote> getAllQuotes(String authorization) {
        return shopOwnerRetriever.getShop(authorization).getQuotes();
    }

    public Quote getQuote(long id) {
        return repository.findById(id).orElseThrow(() -> new DataNotFoundException("Quote with id " + id + " not found."));
    }

    public void deleteQuote(long id) {
        quoteRepository.deleteById(id);
    }

    public Quote updateQuoteStatus(long id, String status) {
        Quote quote = getQuote(id);
        if (!QuoteStatus.isValid(status))
            throw new ViolatedConstraintException("Quote status " + status + " is not valid.");
        quote.setQuoteStatus(QuoteStatus.getStatus(status));
        return quoteRepository.save(quote);
    }

    public Quote updateQuotePrice(long quoteId, Double price) {
        Quote quote = getQuote(quoteId);
        quote.setPrice(price);
        quote.setQuoteStatus(QuoteStatus.PENDING_APPROVAL);
        return quoteRepository.save(quote);
    }
}