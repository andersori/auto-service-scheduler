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
    @Column(name = "description_pt", nullable = false)
    val descriptionPt: String,

    @field:NotBlank
    @Column(name = "description_en", nullable = false)
    val descriptionEn: String,

    @field:NotBlank
    @Column(name = "hours_pt", nullable = false)
    val hoursPt: String,

    @field:NotBlank
    @Column(name = "hours_en", nullable = false)
    val hoursEn: String,

    @Column(name = "services_pt", columnDefinition = "TEXT")
    val servicesPt: String, // JSON array as string

    @Column(name = "services_en", columnDefinition = "TEXT")
    val servicesEn: String, // JSON array as string

    @Column(name = "rating", precision = 2, scale = 1)
    val rating: BigDecimal,

    @field:NotBlank
    @Column(name = "workshop_id", unique = true, nullable = false)
    val workshopId: String
)