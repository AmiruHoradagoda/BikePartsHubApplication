package com.bphTeam.bikePartsHub.service.impl;

import com.bphTeam.bikePartsHub.service.ServiceService;
import com.bphTeam.bikePartsHub.dto.response.ServiceTypeDto;
import com.bphTeam.bikePartsHub.entity.ServiceType;
import com.bphTeam.bikePartsHub.exception.ResourceNotFoundException;
import com.bphTeam.bikePartsHub.repository.ServiceTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceServiceImpl implements ServiceService {

    private final ServiceTypeRepository serviceTypeRepository;

    @Override
    public List<ServiceTypeDto> getAllServices() {
        return serviceTypeRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ServiceTypeDto getServiceById(Long id) {
        return serviceTypeRepository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
    }

    @Override
    public ServiceTypeDto createService(ServiceTypeDto serviceTypeDto) {
        ServiceType serviceType = mapToEntity(serviceTypeDto);
        ServiceType savedService = serviceTypeRepository.save(serviceType);
        return mapToDto(savedService);
    }

    @Override
    public ServiceTypeDto updateService(Long id, ServiceTypeDto serviceTypeDto) {
        ServiceType existingService = serviceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));

        existingService.setServiceName(serviceTypeDto.getServiceName());
        existingService.setServiceDuration(serviceTypeDto.getServiceDuration());
        existingService.setServiceCost(serviceTypeDto.getServiceCost());
        existingService.setDescription(serviceTypeDto.getDescription());
        existingService.setFeatures(serviceTypeDto.getFeatures());

        ServiceType updatedService = serviceTypeRepository.save(existingService);
        return mapToDto(updatedService);
    }

    @Override
    public void deleteService(Long id) {
        ServiceType serviceType = serviceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
        serviceTypeRepository.delete(serviceType);
    }

    private ServiceTypeDto mapToDto(ServiceType serviceType) {
        ServiceTypeDto dto = new ServiceTypeDto();
        dto.setId(serviceType.getId());
        dto.setServiceName(serviceType.getServiceName());
        dto.setServiceDuration(serviceType.getServiceDuration());
        dto.setServiceCost(serviceType.getServiceCost());
        dto.setDescription(serviceType.getDescription());
        dto.setFeatures(serviceType.getFeatures());
        return dto;
    }

    private ServiceType mapToEntity(ServiceTypeDto dto) {
        ServiceType serviceType = new ServiceType();
        if (dto.getId() != null) {
            serviceType.setId(dto.getId());
        }
        serviceType.setServiceName(dto.getServiceName());
        serviceType.setServiceDuration(dto.getServiceDuration());
        serviceType.setServiceCost(dto.getServiceCost());
        serviceType.setDescription(dto.getDescription());
        serviceType.setFeatures(dto.getFeatures());
        return serviceType;
    }
}