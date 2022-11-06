package com.backend.spring.user.shopowner;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopOwnerRepository extends JpaRepository<ShopOwner, Long> {
}
