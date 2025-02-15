package com.bphTeam.bikePartsHub.mapper;

import com.bphTeam.bikePartsHub.dto.request.AppointmentSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.response.AppointmentResponseDto;
import com.bphTeam.bikePartsHub.entity.Appointment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {
    Appointment toAppointment(AppointmentSaveRequestDto appointmentDto);
    AppointmentResponseDto toAppointmentResponseDto(Appointment appointmentDto);
}
