package com.backend.spring.services;

import com.backend.spring.entities.Quote;
import com.backend.spring.entities.QuoteStatus;
import com.backend.spring.entities.QuoteStatus;
import com.backend.spring.exceptions.DataNotFoundException;
import com.backend.spring.exceptions.ViolatedConstraintException;
import com.backend.spring.exceptions.ViolatedConstraintException;
import com.backend.spring.repositories.QuoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuoteService {
    private final QuoteRepository quoteRepository;
    private final QuoteRepository quoteRepository;

    private final ShopOwnerRetriever shopOwnerRetriever;

    public List<Quote> getAllQuotes(String authorization) {
        return shopOwnerRetriever.getShop(authorization).getQuotes();
    }

    public Quote getQuote(long id) {
        return quoteRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Quote with id " + id + " not found."));
    }

    public void deleteQuote(long id) {
        quoteRepository.deleteById(id);
        quoteRepository.deleteById(id);
    }

    public Quote updateQuoteStatus(long id, String quoteStatus, String authorization) {
        Quote quote = getQuote(id);
        shopOwnerRetriever.getShop(authorization).getQuotes().stream()
                .filter(curQuote -> curQuote.getId() == id)
                .findFirst()
                .orElseThrow(() -> new DataNotFoundException("Quote with id " + id + " not associated to this shop."));
        QuoteStatus status = QuoteStatus.getStatus(quoteStatus);
        if (status == null)
            throw new ViolatedConstraintException("Quote status " + quoteStatus + " is not a valid status.");
        quote.setQuoteStatus(status);
        return quoteRepository.save(quote);
    }
}