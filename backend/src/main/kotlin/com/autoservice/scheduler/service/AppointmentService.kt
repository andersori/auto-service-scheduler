package com.autoservice.scheduler.service

import com.autoservice.scheduler.dto.AppointmentRequestDto
import com.autoservice.scheduler.dto.AppointmentResponseDto
import com.autoservice.scheduler.dto.AvailableTimeSlotDto
import com.autoservice.scheduler.model.Appointment
import com.autoservice.scheduler.repository.AppointmentRepository
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import java.time.format.DateTimeFormatter

@Service
class AppointmentService(
    private val appointmentRepository: AppointmentRepository
) {
    
    private val workingHours = listOf("08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00")
    
    fun createAppointment(request: AppointmentRequestDto): AppointmentResponseDto {
        val appointment = Appointment(
            clientName = request.clientName,
            clientPhone = request.clientPhone,
            vehicleBrand = request.vehicleBrand,
            vehicleModel = request.vehicleModel,
            vehicleYear = request.vehicleYear,
            vehiclePlate = request.vehiclePlate,
            serviceType = request.serviceType,
            appointmentDate = request.appointmentDate
        )
        
        val savedAppointment = appointmentRepository.save(appointment)
        return mapToResponseDto(savedAppointment)
    }
    
    fun getAvailableTimeSlots(date: String): AvailableTimeSlotDto {
        val localDate = LocalDate.parse(date)
        val startOfDay = localDate.atStartOfDay()
        val endOfDay = localDate.atTime(LocalTime.MAX)
        
        val existingAppointments = appointmentRepository
            .findAppointmentsByDateRange(startOfDay, endOfDay)
            .map { it.appointmentDate.toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")) }
        
        val availableSlots = workingHours.filter { it !in existingAppointments }
        
        return AvailableTimeSlotDto(date, availableSlots)
    }
    
    fun getAllAppointments(): List<AppointmentResponseDto> {
        return appointmentRepository.findAll().map { mapToResponseDto(it) }
    }
    
    private fun mapToResponseDto(appointment: Appointment): AppointmentResponseDto {
        return AppointmentResponseDto(
            id = appointment.id,
            clientName = appointment.clientName,
            clientPhone = appointment.clientPhone,
            vehicleBrand = appointment.vehicleBrand,
            vehicleModel = appointment.vehicleModel,
            vehicleYear = appointment.vehicleYear,
            vehiclePlate = appointment.vehiclePlate,
            serviceType = appointment.serviceType,
            appointmentDate = appointment.appointmentDate,
            createdAt = appointment.createdAt
        )
    }
}