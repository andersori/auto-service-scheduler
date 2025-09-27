package com.autoservice.scheduler.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.time.LocalDateTime

data class AppointmentRequestDto(
    @field:NotBlank(message = "{validation.clientName.notBlank}")
    val clientName: String,
    
    @field:NotBlank(message = "{validation.clientPhone.notBlank}")
    val clientPhone: String,
    
    @field:NotBlank(message = "{validation.vehicleBrand.notBlank}")
    val vehicleBrand: String,
    
    @field:NotBlank(message = "{validation.vehicleModel.notBlank}")
    val vehicleModel: String,
    
    @field:NotNull(message = "{validation.vehicleYear.notNull}")
    val vehicleYear: Int,
    
    
    @field:NotBlank(message = "{validation.serviceType.notBlank}")
    val serviceType: String,
    
    @field:NotNull(message = "{validation.appointmentDate.notNull}")
    val appointmentDate: LocalDateTime
)

data class AppointmentResponseDto(
    val id: Long,
    val clientName: String,
    val clientPhone: String,
    val vehicleBrand: String,
    val vehicleModel: String,
    val vehicleYear: Int,
    val serviceType: String,
    val appointmentDate: LocalDateTime,
    val createdAt: LocalDateTime
)

data class AvailableTimeSlotDto(
    val date: String,
    val timeSlots: List<String>
)

data class ServiceTypeResponseDto(
    val id: Long,
    val name: String
)

data class ErrorResponseDto(
    val message: String,
    val timestamp: LocalDateTime = LocalDateTime.now(),
    val status: Int
)