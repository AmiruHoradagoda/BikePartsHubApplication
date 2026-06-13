package com.bphTeam.bikePartsHub.mapper;

import com.bphTeam.bikePartsHub.dto.request.appointmentRequestDto.AppointmentSaveRequestDto;
import com.bphTeam.bikePartsHub.dto.response.ServiceTypeDto;
import com.bphTeam.bikePartsHub.dto.response.appointmentResponseDto.AppointmentResponseDto;
import com.bphTeam.bikePartsHub.entity.Appointment;
import com.bphTeam.bikePartsHub.entity.ServiceType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "serviceType.id", source = "serviceTypeId")
    @Mapping(target = "user.userId", source = "userId")
    Appointment toAppointment(AppointmentSaveRequestDto appointmentDto);
    @Mapping(target = "serviceTypeDto", source = "serviceType")
    AppointmentResponseDto toAppointmentResponseDto(Appointment appointmentDto);

    ServiceTypeDto toServiceTypeDto(ServiceType serviceType);
}
