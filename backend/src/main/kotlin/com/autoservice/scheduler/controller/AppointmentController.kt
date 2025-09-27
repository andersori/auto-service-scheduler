package com.autoservice.scheduler.controller

import com.autoservice.scheduler.dto.AppointmentRequestDto
import com.autoservice.scheduler.dto.AppointmentResponseDto
import com.autoservice.scheduler.dto.AvailableTimeSlotDto
import com.autoservice.scheduler.service.AppointmentService
import jakarta.validation.Valid
import org.springframework.context.MessageSource
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = ["http://localhost:3000"])
class AppointmentController(
    private val appointmentService: AppointmentService,
    private val messageSource: MessageSource
) {
    
    @PostMapping
    fun createAppointment(
        @Valid @RequestBody request: AppointmentRequestDto,
        @RequestParam workshop: String,
        @RequestHeader("Accept-Language", defaultValue = "pt-BR") language: String
    ): ResponseEntity<AppointmentResponseDto> {
        val locale = parseLocale(language)
        val appointment = appointmentService.createAppointment(request, workshop, locale)
        return ResponseEntity.status(HttpStatus.CREATED).body(appointment)
    }
    
    @GetMapping
    fun getAllAppointments(
        @RequestParam workshop: String
    ): ResponseEntity<List<AppointmentResponseDto>> {
        val appointments = appointmentService.getAllAppointments(workshop)
        return ResponseEntity.ok(appointments)
    }
    
    @GetMapping("/available-slots")
    fun getAvailableTimeSlots(
        @RequestParam date: String,
        @RequestParam workshop: String,
        @RequestHeader("Accept-Language", defaultValue = "pt-BR") language: String
    ): ResponseEntity<AvailableTimeSlotDto> {
        val locale = parseLocale(language)
        val timeSlots = appointmentService.getAvailableTimeSlots(date, workshop, locale)
        return ResponseEntity.ok(timeSlots)
    }
    
    private fun parseLocale(language: String): Locale {
        return when {
            language.startsWith("en") -> Locale("en", "US")
            language.startsWith("pt") -> Locale("pt", "BR")
            else -> Locale("pt", "BR") // Default to Portuguese
        }
    }
}