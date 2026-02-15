package com.hospital.dto.response;

// File: com.example.hospitalmanagement.dto.PatientResponse.java

import lombok.Data;

@Data
public class AppointmentResponse {
    private Long id;
    private String doctorName;
    private String doctorSpecialization;
    private String patientName;
    private String appointmentDate;
    private String appointmentTime;
    private String reason;
    private String status;
    private String diagnosis;
    private String prescription;
}
