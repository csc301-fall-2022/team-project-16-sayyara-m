package com.backend.spring.controllers;

import com.backend.spring.entities.Appointment;
import com.backend.spring.exceptions.DataNotFoundException;
import com.backend.spring.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@CrossOrigin
@RequestMapping(path = "appointments")
public class AppointmentController {
    private final AppointmentService service;

    @Autowired
    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments(@RequestHeader(AUTHORIZATION) String authorizationHeader) {
        return ResponseEntity.ok(service.getAllAppointments(authorizationHeader));
    }

    @GetMapping(path = "{appointmentId}")
    public ResponseEntity<Appointment> getAppointment(@PathVariable long appointmentId) throws DataNotFoundException {
        return ResponseEntity.ok(service.getAppointment(appointmentId));
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment receivedAppointment) throws URISyntaxException {
        Appointment appointment = service.createAppointment(receivedAppointment);
        return ResponseEntity.created(new URI("/api/appointments/" + appointment.getId())).body(appointment);
    }

    @DeleteMapping(path = "{appointment_id}")
    public void deleteAppointment(@PathVariable("appointment_id") long id) {
        service.deleteAppointment(id);
    }

    @PutMapping(path = "{appointment_id}")
    public void updateAppointment(@PathVariable("appointment_id") Long id,
                                  @RequestParam(required = false) LocalDateTime startDate,
                                  @RequestParam(required = false) LocalDateTime endDate) {
        service.updateAppointment(id, startDate, endDate);
    }
}
