package com.backend.spring.appointment;

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

    public Appointment getAppointment(long id) {
        return repository.findById(id).orElseThrow(IllegalStateException::new);
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
