package com.autoservice.scheduler.model

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import java.time.LocalDateTime

@Entity
@Table(name = "appointments")
data class Appointment(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    
    @NotBlank
    @Column(name = "client_name")
    val clientName: String,
    
    @NotBlank
    @Column(name = "client_phone")
    val clientPhone: String,
    
    @NotBlank
    @Column(name = "vehicle_brand")
    val vehicleBrand: String,
    
    @NotBlank
    @Column(name = "vehicle_model")
    val vehicleModel: String,
    
    @Column(name = "vehicle_year")
    val vehicleYear: Int,
    
    @NotBlank
    @Column(name = "service_type")
    val serviceType: String,
    
    @Column(name = "appointment_date")
    val appointmentDate: LocalDateTime,
    
    @Column(name = "created_at")
    val createdAt: LocalDateTime = LocalDateTime.now()
)