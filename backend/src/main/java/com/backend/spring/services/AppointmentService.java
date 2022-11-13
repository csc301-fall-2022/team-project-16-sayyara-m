package com.backend.spring.services;

import com.backend.spring.entities.Appointment;
import com.backend.spring.exceptions.DataNotFoundException;
import com.backend.spring.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentRepository repository;

    @Autowired
    public AppointmentService(AppointmentRepository repository) {
        this.repository = repository;
    }

    public List<Appointment> getAllAppointments() {
        return repository.findAll();
    }

    public Appointment getAppointment(long id) throws DataNotFoundException {
        return repository.findById(id).orElseThrow(() -> new DataNotFoundException("Appointment with id " + id + " doesn't exist"));
    }

    public Appointment createAppointment(Appointment appointment) {
        return repository.save(appointment);
    }

    public void deleteAppointment(long id) {
        repository.deleteById(id);
    }

    @Transactional
    public void updateAppointment(long id, LocalDateTime startDate, LocalDateTime endDate) {
        Appointment appointment = repository.findById(id).orElseThrow(IllegalStateException::new);

        if (startDate != null) {
            appointment.setStartDate(startDate);
        }

        if (endDate != null) {
            appointment.setStartDate(endDate);
        }
    }
}
