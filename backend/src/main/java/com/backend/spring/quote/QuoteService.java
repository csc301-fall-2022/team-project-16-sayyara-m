package com.backend.spring.quote;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuoteService {
    private final QuoteRepository repository;

    @Autowired
    public QuoteService(QuoteRepository repository) {
        this.repository = repository;
    }

    public List<Quote> getAllQuotes() {
        return repository.findAll();
    }

    public Quote getQuote(long id) {
        return repository.findById(id).orElseThrow(IllegalStateException::new);
    }

    public Quote createQuote(Quote quote) {
        return repository.save(quote);
    }

    public void deleteQuote(long id) {
        repository.deleteById(id);
    }

    @Transactional
    public void updateQuote(long id, Double price, LocalDateTime expiryDate) {
        Quote quote = repository.findById(id).orElseThrow(IllegalStateException::new);

        if (price != null) {
            quote.setPrice(price);
        }

        if (expiryDate != null) {
            quote.setExpiryDate(expiryDate);
        }
    }
}
