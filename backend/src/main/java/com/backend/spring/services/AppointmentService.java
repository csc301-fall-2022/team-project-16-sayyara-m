package com.backend.spring.services;

import com.backend.spring.entities.Appointment;
import com.backend.spring.entities.Shop;
import com.backend.spring.entities.VehicleOwner;
import com.backend.spring.exceptions.DataNotFoundException;
import com.backend.spring.exceptions.ForbiddenException;
import com.backend.spring.exceptions.ViolatedConstraintException;
import com.backend.spring.repositories.AppointmentRepository;
import com.backend.spring.repositories.ShopRepository;
import com.backend.spring.validators.AppointmentValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    private final ShopOwnerRetriever shopOwnerRetriever;

    private final VehicleOwnerSaveHelper vehicleOwnerSaveHelper;

    private final ShopRepository shopRepository;

    public List<Appointment> getAllAppointments(String authorization) {
        return shopOwnerRetriever.getShop(authorization).getAppointments();
    }

    public Appointment getAppointment(long id) throws DataNotFoundException {
        return appointmentRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Appointment with id " + id + " doesn't exist"));
    }

    public Appointment createAppointment(Appointment appointment) {
        new AppointmentValidator(appointment).validate();

        if (appointment.getVehicleOwner() == null)
            throw new ViolatedConstraintException("Vehicle owner is required");

        if (appointment.getShopId() == null)
            throw new ViolatedConstraintException("Shop id is required");

        Shop shop = shopRepository.findById(appointment.getShopId())
                .orElseThrow(() -> new DataNotFoundException("Shop in Appointment with id " + appointment.getShop().getId() + " not found"));

        Optional<com.backend.spring.entities.Service> shopService = shop.getServices()
                .stream()
                .filter(service -> service.getName().equals(appointment.getServiceName()))
                .findFirst();

        if (shopService.isEmpty())
            throw new ViolatedConstraintException("Shop does not contain the service " + appointment.getServiceName());

        com.backend.spring.entities.Service service = shopService.get();
        if (service.getDefaultPrice() == null)
            throw new ViolatedConstraintException("The service " + service.getName() + " offered by this shop does not have a default price. Please request a quote instead.");

        appointment.setShop(shop);
        appointment.setService(service);

        VehicleOwner vehicleOwner = appointment.getVehicleOwner();

        appointment.setVehicleOwner(vehicleOwner);
        vehicleOwner.getAppointments().add(appointment);
        vehicleOwner = vehicleOwnerSaveHelper.save(vehicleOwner);
        return vehicleOwner
                .getAppointments()
                .stream()
                .filter(prevAppointment -> prevAppointment.equals(appointment))
                .findFirst()
                .orElseThrow(() -> new ForbiddenException("Something went wrong while creating the appointment"));
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
