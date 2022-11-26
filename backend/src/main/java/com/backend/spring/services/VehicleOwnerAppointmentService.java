package com.backend.spring.services;

import com.backend.spring.entities.Appointment;
import com.backend.spring.entities.Quote;
import com.backend.spring.entities.Shop;
import com.backend.spring.entities.VehicleOwner;
import com.backend.spring.exceptions.DataNotFoundException;
import com.backend.spring.exceptions.ViolatedConstraintException;
import com.backend.spring.repositories.AppointmentRepository;
import com.backend.spring.repositories.QuoteRepository;
import com.backend.spring.repositories.ShopRepository;
import com.backend.spring.repositories.VehicleOwnerRepository;
import com.backend.spring.validators.AppointmentValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleOwnerAppointmentService {
    private final AppointmentRepository appointmentRepository;

    private final VehicleOwnerRepository vehicleOwnerRepository;

    private final VehicleOwnerSaveHelper vehicleOwnerSaveHelper;

    private final QuoteRepository quoteRepository;

    private final ShopRepository shopRepository;

    public List<Appointment> getAllAppointmentsForVehicleOwner(long id) {
        return appointmentRepository.findAllByVehicleOwner_Id(id)
                .orElseThrow(() -> new DataNotFoundException("Vehicle owner with id " + id + " not found"));
    }

    public Appointment createAppointment(long vehicleOwnerId, Appointment appointment) {
        new AppointmentValidator(appointment).validate();

        VehicleOwner vehicleOwner = vehicleOwnerRepository.findById(vehicleOwnerId)
                .orElseThrow(() -> new DataNotFoundException("Vehicle owner with id " + vehicleOwnerId + " not found"));

        Shop shop = shopRepository.findById(appointment.getShopId())
                .orElseThrow(() -> new DataNotFoundException("Shop with id " + appointment.getShopId() + " not found"));
        appointment.setShop(shop);
        appointment.setService(new com.backend.spring.entities.Service(appointment.getServiceName()));

        appointment.setVehicleOwner(vehicleOwner);
        vehicleOwner.getAppointments().add(appointment);
        vehicleOwner = vehicleOwnerSaveHelper.save(vehicleOwner);
        return vehicleOwner
                .getAppointments()
                .get(vehicleOwner.getAppointments().size() - 1);
    }

    public Appointment createAppointmentFromQuote(long vehicleOwnerId, Appointment appointment, long quoteId) {
        validateAppointmentTimes(appointment);

        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new DataNotFoundException("Quote with id " + quoteId + " not found"));

        if (quote.getVehicleOwner().getId() != vehicleOwnerId)
            throw new DataNotFoundException("Quote with id " + quoteId + " not found for vehicle owner with id " + vehicleOwnerId);

        VehicleOwner vehicleOwner = vehicleOwnerRepository.findById(vehicleOwnerId)
                .orElseThrow(() -> new DataNotFoundException("Vehicle owner with id " + vehicleOwnerId + " not found"));

        Appointment newAppointment = quoteToAppointment(quote, appointment.getStartTime(), appointment.getEndTime());
        newAppointment.setService(new com.backend.spring.entities.Service(newAppointment.getServiceName()));
        newAppointment.setWasQuote(true);

        vehicleOwner.getAppointments().add(newAppointment);
        vehicleOwner = vehicleOwnerSaveHelper.save(vehicleOwner);
        return vehicleOwner
                .getAppointments()
                .get(vehicleOwner.getAppointments().size() - 1);
    }

    private void validateAppointmentTimes(Appointment appointment) {
        if (appointment.getStartTime() == null || appointment.getEndTime() == null)
            throw new ViolatedConstraintException("Start and end time must be specified");

        if (appointment.getStartTime().isAfter(appointment.getEndTime()))
            throw new ViolatedConstraintException("Start time must be before end time");
    }

    private Appointment quoteToAppointment(Quote quote, LocalDateTime startTime, LocalDateTime endTime) {
        return new Appointment(quote.getShop(), quote.getVehicleOwner(), startTime, endTime, quote.getService());
    }
}
