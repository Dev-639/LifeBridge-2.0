package com.hospital.service;

import com.hospital.dto.request.AppointmentRequest;
import com.hospital.dto.request.AppointmentUpdateRequest;
import com.hospital.dto.response.AppointmentResponse;
import java.util.List;

public interface AppointmentService {
    AppointmentResponse bookAppointment(AppointmentRequest request);

    List<AppointmentResponse> getAppointmentsByPatient(String email);

    List<AppointmentResponse> getAppointmentsByDoctor(String email);

    void cancelAppointment(Long appointmentId);

    AppointmentResponse updateAppointmentStatus(Long id, AppointmentUpdateRequest request);
}
