package com.bphTeam.bikePartsHub.service;

import com.bphTeam.bikePartsHub.dto.response.ServiceTypeDto;

import java.util.List;

public interface ServiceService {
    List<ServiceTypeDto> getAllServices();
    ServiceTypeDto getServiceById(Long id);
    ServiceTypeDto createService(ServiceTypeDto serviceTypeDto);
    ServiceTypeDto updateService(Long id, ServiceTypeDto serviceTypeDto);
    void deleteService(Long id);
}
