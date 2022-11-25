package com.backend.spring.repositories;

import com.backend.spring.entities.ShopOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShopOwnerRepository extends JpaRepository<ShopOwner, Long> {
    Optional<ShopOwner> findByUsername(String username);
}
