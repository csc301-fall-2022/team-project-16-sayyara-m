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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;

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
    public ResponseEntity<List<Appointment>> getAllAppointments(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        return ResponseEntity.ok(service.getAllAppointments(authorizationHeader));
    }

    @GetMapping(path = "{appointmentId}")
    public ResponseEntity<Appointment> getAppointment(@PathVariable long appointmentId) throws DataNotFoundException {
        return ResponseEntity.ok(service.getAppointment(appointmentId));
    }

    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return service.createAppointment(appointment);
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
