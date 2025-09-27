package com.autoservice.scheduler.controller

import com.autoservice.scheduler.dto.ServiceTypeResponseDto
import com.autoservice.scheduler.service.ServiceTypeService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/service-types")
@CrossOrigin(origins = ["http://localhost:3000"])
class ServiceTypeController(
    private val serviceTypeService: ServiceTypeService
) {
    
    @GetMapping("/active")
    fun getActiveServiceTypes(): ResponseEntity<List<ServiceTypeResponseDto>> {
        val activeServiceTypes = serviceTypeService.getActiveServiceTypes()
        return ResponseEntity.ok(activeServiceTypes)
    }
}