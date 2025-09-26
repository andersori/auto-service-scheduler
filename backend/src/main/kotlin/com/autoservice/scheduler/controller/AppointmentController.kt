package com.autoservice.scheduler.controller

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
) {
    
    @PostMapping
    fun createAppointment(@Valid @RequestBody request: AppointmentRequestDto): ResponseEntity<AppointmentResponseDto> {
        val appointment = appointmentService.createAppointment(request)
        return ResponseEntity.status(HttpStatus.CREATED).body(appointment)
    }
    
    @GetMapping
    fun getAllAppointments(): ResponseEntity<List<AppointmentResponseDto>> {
        val appointments = appointmentService.getAllAppointments()
        return ResponseEntity.ok(appointments)
    }
    
    @GetMapping("/available-slots")
    fun getAvailableTimeSlots(@RequestParam date: String): ResponseEntity<AvailableTimeSlotDto> {
        val timeSlots = appointmentService.getAvailableTimeSlots(date)
        return ResponseEntity.ok(timeSlots)
    }
}