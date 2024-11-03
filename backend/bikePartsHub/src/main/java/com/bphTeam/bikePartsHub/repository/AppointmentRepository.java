package com.bphTeam.bikePartsHub.repository;

import com.bphTeam.bikePartsHub.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDate(LocalDate date);
    List<Appointment> findByDateAndStartTime(LocalDate date, String startTime);
}
