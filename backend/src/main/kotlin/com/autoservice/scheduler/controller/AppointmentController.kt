package com.autoservice.scheduler.controller

import com.autoservice.scheduler.controller.config.DefaultControllerSettings
import com.autoservice.scheduler.dto.AppointmentRequestDto
import com.autoservice.scheduler.dto.AppointmentResponseDto
import com.autoservice.scheduler.dto.AvailableTimeSlotDto
import com.autoservice.scheduler.service.AppointmentService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = ["http://localhost:3000"])
class AppointmentController(
    private val appointmentService: AppointmentService
) : DefaultControllerSettings() {

    @PostMapping
    fun createAppointment(
        @Valid @RequestBody request: AppointmentRequestDto,
        @RequestParam workshop: String,
        @RequestHeader("Accept-Language", defaultValue = "pt-BR") language: String
    ): ResponseEntity<AppointmentResponseDto> {
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(appointmentService.createAppointment(request, workshop, parseLocale(language)))
    }

    @GetMapping
    fun getAllAppointments(
        @RequestParam workshop: String
    ): ResponseEntity<List<AppointmentResponseDto>> {
        return ResponseEntity.ok(appointmentService.getAllAppointments(workshop))
    }

    @GetMapping("/available-slots")
    fun getAvailableTimeSlots(
        @RequestParam date: String,
        @RequestParam workshop: String,
        @RequestHeader("Accept-Language", defaultValue = "pt-BR") language: String
    ): ResponseEntity<AvailableTimeSlotDto> {
        return ResponseEntity
            .ok(appointmentService.getAvailableTimeSlots(date, workshop, parseLocale(language)))
    }
}
