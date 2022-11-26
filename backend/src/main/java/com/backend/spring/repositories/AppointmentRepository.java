package com.backend.spring.repositories;

import com.backend.spring.entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Optional<List<Appointment>> findAllByVehicleOwner_Id(long id);
}
