package com.backend.spring.controllers;

import com.backend.spring.entities.Appointment;
import com.backend.spring.services.VehicleOwnerAppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping(path = "vehicleOwner/{vehicleOwnerId}")
public class VehicleOwnerAppointmentController {

    private final VehicleOwnerAppointmentService service;

    @GetMapping("appointments")
    public ResponseEntity<List<Appointment>> getAllAppointmentsForVehicleOwner(@PathVariable long vehicleOwnerId) {
        return ResponseEntity.ok().body(service.getAllAppointmentsForVehicleOwner(vehicleOwnerId));
    }

    @PostMapping("appointments")
    public ResponseEntity<Appointment> createAppointmentWithVehicleOwner(@PathVariable long vehicleOwnerId,
                                                                         @RequestBody Appointment receivedAppointment,
                                                                         @RequestParam(required = false) Long quoteId) throws URISyntaxException {
        Appointment appointment;
        if (quoteId == null)
            appointment = service.createAppointmentWithVehicleOwner(vehicleOwnerId, receivedAppointment);
        else
            appointment = service.createAppointmentFromQuote(vehicleOwnerId, receivedAppointment, quoteId);
        return ResponseEntity.created(new URI("/api/appointments/" + appointment.getId())).body(appointment);
    }
}
