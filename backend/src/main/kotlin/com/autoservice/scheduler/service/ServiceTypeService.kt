package com.autoservice.scheduler.service

import com.autoservice.scheduler.dto.ServiceTypeResponseDto
import com.autoservice.scheduler.model.ServiceType
import com.autoservice.scheduler.repository.ServiceTypeRepository
import org.springframework.stereotype.Service

@Service
class ServiceTypeService(
    private val serviceTypeRepository: ServiceTypeRepository
) {
    
    fun getActiveServiceTypes(workshop: String): List<ServiceTypeResponseDto> {
        // For now, return same service types for all workshops
        // In a real implementation, this could be filtered per workshop
        return serviceTypeRepository.findActiveServiceTypes()
            .map { mapToResponseDto(it) }
    }
    
    private fun mapToResponseDto(serviceType: ServiceType): ServiceTypeResponseDto {
        return ServiceTypeResponseDto(
            id = serviceType.id,
            name = serviceType.name
        )
    }
}