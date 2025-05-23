package com.bphTeam.bikePartsHub.repository;

import com.bphTeam.bikePartsHub.entity.Appointment;
import com.bphTeam.bikePartsHub.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment>  findByUser(User user);

    List<Appointment> findByUser_UserId(Integer userId);

    List<Appointment> findByStartDate(LocalDate date);
}
