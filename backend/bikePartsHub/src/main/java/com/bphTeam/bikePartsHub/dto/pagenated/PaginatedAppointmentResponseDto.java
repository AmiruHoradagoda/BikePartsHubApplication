package com.bphTeam.bikePartsHub.dto.pagenated;

import com.bphTeam.bikePartsHub.dto.response.appointmentResponseDto.AppointmentResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaginatedAppointmentResponseDto {
   private Set<AppointmentResponseDto> appointmentResponseDto;
    private long dataCount;
}
