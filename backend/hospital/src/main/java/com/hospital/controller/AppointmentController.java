package com.hospital.controller;

import com.hospital.dto.request.AppointmentRequest;
import com.hospital.dto.request.AppointmentUpdateRequest;
import com.hospital.dto.response.AppointmentResponse;
import com.hospital.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/book")
    public ResponseEntity<AppointmentResponse> bookAppointment(@Valid @RequestBody AppointmentRequest request) {
        AppointmentResponse response = appointmentService.bookAppointment(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/patient/{email:.+}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByPatient(@PathVariable String email) {
        List<AppointmentResponse> appointments = appointmentService.getAppointmentsByPatient(email);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/doctor/{email:.+}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByDoctor(@PathVariable String email) {
        List<AppointmentResponse> appointments = appointmentService.getAppointmentsByDoctor(email);
        return ResponseEntity.ok(appointments);
    }

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
        return ResponseEntity.ok("Appointment cancelled successfully");
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<AppointmentResponse> updateAppointmentStatus(@PathVariable Long id,
            @RequestBody AppointmentUpdateRequest request) {
        AppointmentResponse response = appointmentService.updateAppointmentStatus(id, request);
        return ResponseEntity.ok(response);
    }
}
