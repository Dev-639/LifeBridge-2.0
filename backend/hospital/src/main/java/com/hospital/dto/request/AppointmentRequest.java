package com.hospital.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.FutureOrPresent;
import lombok.Data;
import java.time.LocalDate;

@Data
public class AppointmentRequest {

	@NotNull(message = "Doctor ID is required")
	private Long doctorId;

	@NotNull(message = "Patient Email is required")
	private String patientEmail;

	@NotNull(message = "Date is required")
	@FutureOrPresent(message = "Date must be today or in the future")
	private LocalDate appointmentDate;

	@NotNull(message = "Time is required")
	private String appointmentTime;

	private String reason;
}
