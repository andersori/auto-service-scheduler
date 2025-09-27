package com.autoservice.scheduler.controller

import com.autoservice.scheduler.controller.config.DefaultControllerSettings
import com.autoservice.scheduler.dto.VehicleCatalogResponseDto
import com.autoservice.scheduler.service.VehicleCatalogService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/vehicle-catalog")
@CrossOrigin(origins = ["http://localhost:3000"])
class VehicleCatalogController(
    private val vehicleCatalogService: VehicleCatalogService
) : DefaultControllerSettings() {

    @GetMapping
    fun getVehicleCatalog(
        @RequestParam workshop: String,
        @RequestHeader("Accept-Language", defaultValue = "pt-BR") language: String
    ): ResponseEntity<VehicleCatalogResponseDto> {
        return ResponseEntity
            .ok(vehicleCatalogService.getVehicleCatalogByWorkshop(workshop, parseLocale(language)))
    }
}
