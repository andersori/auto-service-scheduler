package com.autoservice.scheduler.controller

import com.autoservice.scheduler.dto.VehicleCatalogResponseDto
import com.autoservice.scheduler.service.VehicleCatalogService
import org.springframework.context.MessageSource
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/vehicle-catalog")
@CrossOrigin(origins = ["http://localhost:3000"])
class VehicleCatalogController(
    private val vehicleCatalogService: VehicleCatalogService,
    private val messageSource: MessageSource
) {
    
    @GetMapping
    fun getVehicleCatalog(
        @RequestParam workshop: String,
        @RequestHeader("Accept-Language", defaultValue = "pt-BR") language: String
    ): ResponseEntity<Map<String, List<String>>> {
        val locale = parseLocale(language)
        val catalog = vehicleCatalogService.getVehicleCatalogByWorkshop(workshop, locale)
        return ResponseEntity.ok(catalog)
    }
    
    private fun parseLocale(language: String): Locale {
        return when {
            language.startsWith("en") -> Locale("en", "US")
            language.startsWith("pt") -> Locale("pt", "BR")
            else -> Locale("pt", "BR") // Default to Portuguese
        }
    }
}