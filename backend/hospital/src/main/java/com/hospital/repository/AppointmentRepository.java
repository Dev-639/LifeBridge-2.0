package com.hospital.repository;

import com.hospital.entity.Appointment;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    @EntityGraph(attributePaths = { "patient", "doctor" })
    List<Appointment> findByPatient_Email(String email);

    @EntityGraph(attributePaths = { "patient", "doctor" })
    List<Appointment> findByDoctor_Email(String email);

    @EntityGraph(attributePaths = { "patient", "doctor" })
    List<Appointment> findByDoctor_Id(Long doctorId);
}
