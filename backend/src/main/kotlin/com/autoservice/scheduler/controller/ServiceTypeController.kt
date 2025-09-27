package com.autoservice.scheduler.controller

import com.autoservice.scheduler.controller.config.DefaultControllerSettings
import com.autoservice.scheduler.dto.ServiceTypeResponseDto
import com.autoservice.scheduler.service.ServiceTypeService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/service-types")
@CrossOrigin(origins = ["http://localhost:3000"])
class ServiceTypeController(
    private val serviceTypeService: ServiceTypeService
) : DefaultControllerSettings() {

    @GetMapping("/active")
    fun getActiveServiceTypes(
        @RequestParam workshop: String
    ): ResponseEntity<List<ServiceTypeResponseDto>> {
        return ResponseEntity.ok(serviceTypeService.getActiveServiceTypes(workshop))
    }
}
