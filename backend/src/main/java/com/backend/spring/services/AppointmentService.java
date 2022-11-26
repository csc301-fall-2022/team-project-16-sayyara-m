package com.backend.spring.services;

import com.backend.spring.entities.Appointment;
import com.backend.spring.exceptions.DataNotFoundException;
import com.backend.spring.repositories.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    private final ShopOwnerRetriever shopOwnerRetriever;

    public List<Appointment> getAllAppointments(String authorization) {
        return shopOwnerRetriever.getShop(authorization).getAppointments();
    }

    public Appointment getAppointment(long id) throws DataNotFoundException {
        return appointmentRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Appointment with id " + id + " doesn't exist"));
    }

    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(long id) {
        appointmentRepository.deleteById(id);
    }

    @Transactional
    public void updateAppointment(long id, LocalDateTime startDate, LocalDateTime endDate) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(IllegalStateException::new);

        if (startDate != null) {
            appointment.setStartTime(startDate);
        }

        if (endDate != null) {
            appointment.setStartTime(endDate);
        }
    }
}
