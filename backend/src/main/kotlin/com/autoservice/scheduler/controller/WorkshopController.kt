package com.autoservice.scheduler.controller

import com.autoservice.scheduler.controller.config.DefaultControllerSettings
import com.autoservice.scheduler.dto.WorkshopResponseDto
import com.autoservice.scheduler.service.WorkshopService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/workshops")
@CrossOrigin(origins = ["http://localhost:3000"])
class WorkshopController(
    private val workshopService: WorkshopService
) : DefaultControllerSettings() {

    @GetMapping
    fun getAllWorkshops(
        @RequestHeader(name = "Accept-Language", defaultValue = "pt-BR") language: String
    ): ResponseEntity<List<WorkshopResponseDto>> {
        return ResponseEntity.ok(workshopService.getAllWorkshops(language))
    }
    
    @GetMapping("/{workshopId}")
    fun getWorkshopById(
        @PathVariable workshopId: String,
        @RequestHeader(name = "Accept-Language", defaultValue = "pt-BR") language: String
    ): ResponseEntity<WorkshopResponseDto> {
        val workshop = workshopService.getWorkshopById(workshopId, language)
        return if (workshop != null) {
            ResponseEntity.ok(workshop)
        } else {
            ResponseEntity.notFound().build()
        }
    }
}