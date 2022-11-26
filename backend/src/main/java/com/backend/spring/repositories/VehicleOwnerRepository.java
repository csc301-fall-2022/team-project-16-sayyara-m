package com.backend.spring.repositories;

import com.backend.spring.entities.VehicleOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VehicleOwnerRepository extends JpaRepository<VehicleOwner, Long> {
    Optional<VehicleOwner> findByEmail(String email);
}
