package com.autoservice.scheduler.service

import com.autoservice.scheduler.dto.WorkshopResponseDto
import com.autoservice.scheduler.model.Workshop
import com.autoservice.scheduler.repository.WorkshopRepository
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.springframework.stereotype.Service

@Service
class WorkshopService(
    private val workshopRepository: WorkshopRepository
) {
    private val objectMapper = jacksonObjectMapper()
    
    fun getAllWorkshops(language: String = "pt-BR"): List<WorkshopResponseDto> {
        return workshopRepository.findAll()
            .map { mapToResponseDto(it, language) }
    }
    
    fun getWorkshopById(workshopId: String, language: String = "pt-BR"): WorkshopResponseDto? {
        return workshopRepository.findByWorkshopId(workshopId)
            ?.let { mapToResponseDto(it, language) }
    }
    
    private fun mapToResponseDto(workshop: Workshop, language: String): WorkshopResponseDto {
        val isPtBr = language.startsWith("pt")
        
        val description = if (isPtBr) workshop.descriptionPt else workshop.descriptionEn
        val hours = if (isPtBr) workshop.hoursPt else workshop.hoursEn
        val servicesJson = if (isPtBr) workshop.servicesPt else workshop.servicesEn
        
        val services = try {
            objectMapper.readValue<List<String>>(servicesJson, object : TypeReference<List<String>>() {})
        } catch (e: Exception) {
            emptyList<String>()
        }
        
        return WorkshopResponseDto(
            id = workshop.workshopId,
            name = workshop.name,
            address = workshop.address,
            phone = workshop.phone,
            description = description,
            hours = hours,
            services = services,
            rating = workshop.rating
        )
    }
}