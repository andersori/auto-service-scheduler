package com.autoservice.scheduler.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.time.LocalDateTime

data class AppointmentRequestDto(
    @field:NotBlank(message = "Client name is required")
    val clientName: String,
    
    @field:NotBlank(message = "Client phone is required")
    val clientPhone: String,
    
    @field:NotBlank(message = "Vehicle brand is required")
    val vehicleBrand: String,
    
    @field:NotBlank(message = "Vehicle model is required")
    val vehicleModel: String,
    
    @field:NotNull(message = "Vehicle year is required")
    val vehicleYear: Int,
    
    @field:NotBlank(message = "Vehicle plate is required")
    val vehiclePlate: String,
    
    @field:NotBlank(message = "Service type is required")
    val serviceType: String,
    
    @field:NotNull(message = "Appointment date is required")
    val appointmentDate: LocalDateTime
)

data class AppointmentResponseDto(
    val id: Long,
    val clientName: String,
    val clientPhone: String,
    val vehicleBrand: String,
    val vehicleModel: String,
    val vehicleYear: Int,
    val vehiclePlate: String,
    val serviceType: String,
    val appointmentDate: LocalDateTime,
    val createdAt: LocalDateTime
)

data class AvailableTimeSlotDto(
    val date: String,
    val timeSlots: List<String>
)