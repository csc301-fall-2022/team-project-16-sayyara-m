package com.backend.spring.repositories;

import com.backend.spring.entities.ShopOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopOwnerRepository extends JpaRepository<ShopOwner, Long> {
    ShopOwner findByUsername(String username);
}
