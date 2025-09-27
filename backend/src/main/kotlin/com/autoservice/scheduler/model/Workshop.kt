package com.autoservice.scheduler.model

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import java.math.BigDecimal

@Entity
@Table(name = "workshops")
data class Workshop(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @field:NotBlank
    @Column(name = "name", nullable = false)
    val name: String,

    @field:NotBlank
    @Column(name = "address", nullable = false)
    val address: String,

    @field:NotBlank
    @Column(name = "phone", nullable = false)
    val phone: String,

    @field:NotBlank
    @Column(name = "description", nullable = false)
    val description: String,

    @field:NotBlank
    @Column(name = "hours", nullable = false)
    val hours: String,

    @Column(name = "services", columnDefinition = "TEXT")
    val services: String, // JSON array as string

    @Column(name = "rating", precision = 2, scale = 1)
    val rating: BigDecimal,

    @field:NotBlank
    @Column(name = "workshop_id", unique = true, nullable = false)
    val workshopId: String,

    @field:NotBlank
    @Column(name = "registration_language", nullable = false)
    val registrationLanguage: String // "pt-BR" or "en-US"
)