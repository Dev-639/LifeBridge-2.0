package com.hospital.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.dto.request.PatientRegistrationRequest;
import com.hospital.dto.response.PatientResponse;
import com.hospital.entity.Patient;
import com.hospital.entity.User;
import com.hospital.exception.CustomInternalServerException;
import com.hospital.exception.EmailAlreadyExistsException;
import com.hospital.mapper.PatientMapper;
import com.hospital.repository.PatientRepository;
import com.hospital.service.PatientService;
import com.hospital.service.UserService;

import jakarta.transaction.Transactional;

@Service
public class PatientServiceImpl implements PatientService {

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private UserService userService;

	@Override
	public PatientResponse registerPatient(PatientRegistrationRequest request) {
		if (request == null) {
			throw new IllegalArgumentException("Registration request cannot be null");
		}

		try {
			User savedUser = userService.createUser(request.getEmail(), request.getPassword(), "PATIENT");

			Patient patient = new Patient();
			BeanUtils.copyProperties(request, patient);
			patient.setUserId(savedUser.getId());
			Patient savedPatient = patientRepository.save(patient);

			return PatientMapper.toPatientResponse(savedPatient);

		} catch (EmailAlreadyExistsException ex) {
			throw new EmailAlreadyExistsException(
					"The provided email is already registered. Please use a different email.");

		} catch (Exception ex) {
			throw new CustomInternalServerException(
					"An error occurred while registering the patient. Please try again later.");
		}
	}

	public Optional<Patient> findByEmail(String email) {
		return patientRepository.findByEmail(email);
	}

	@Override
	public PatientResponse getPatientByEmail(String email) {
		Optional<Patient> patient = patientRepository.findByEmail(email);
		return patient.map(PatientMapper::toPatientResponse).orElse(null);
	}

	@Override
	public List<PatientResponse> getAllPatients() {
		List<Patient> patients = patientRepository.findAll();
		return patients.stream().map(PatientMapper::toPatientResponse).collect(Collectors.toList());
	}

	public PatientResponse updatePatient(String email, PatientResponse updatedPatient) {
		Optional<Patient> existingPatient = findByEmail(email);

		if (!existingPatient.isPresent()) {
			throw new IllegalArgumentException("Patient not found");
		}

		Patient patient = existingPatient.get();

		if (updatedPatient.getFirstName() != null) {
			patient.setFirstName(updatedPatient.getFirstName());
		}
		if (updatedPatient.getLastName() != null) {
			patient.setLastName(updatedPatient.getLastName());
		}
		if (updatedPatient.getPhoneNumber() != null) {
			patient.setPhoneNumber(updatedPatient.getPhoneNumber());
		}
		if (updatedPatient.getGender() != null) {
			patient.setGender(updatedPatient.getGender());
		}
		if (updatedPatient.getDateOfBirth() != null) {
			patient.setDateOfBirth(updatedPatient.getDateOfBirth());
		}
		if (updatedPatient.getCity() != null) {
			patient.setCity(updatedPatient.getCity());
		}
		if (updatedPatient.getState() != null) {
			patient.setState(updatedPatient.getState());
		}
		if (updatedPatient.getCountry() != null) {
			patient.setCountry(updatedPatient.getCountry());
		}

		patientRepository.save(patient);

		return PatientMapper.toPatientResponse(patient);
	}

	@Transactional
	public boolean deletePatient(String email) {
		Optional<Patient> optionalPatient = patientRepository.findByEmail(email);

		if (optionalPatient.isEmpty()) {
			return false;
		}

		Patient patientToDelete = optionalPatient.get();
		patientRepository.delete(patientToDelete);

		return true;
	}

}
