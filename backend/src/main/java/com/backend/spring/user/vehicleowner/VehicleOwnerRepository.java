package com.backend.spring.user.vehicleowner;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleOwnerRepository extends JpaRepository<VehicleOwner, Long> {
    VehicleOwner findByUsername(String username);
}
