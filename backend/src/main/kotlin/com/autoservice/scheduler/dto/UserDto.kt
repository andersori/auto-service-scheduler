package com.autoservice.scheduler.dto

import com.autoservice.scheduler.model.UserType
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank

data class UserRegistrationDto(
    @field:NotBlank(message = "Nome é obrigatório")
    val name: String,

    @field:Email(message = "Email inválido")
    @field:NotBlank(message = "Email é obrigatório")
    val email: String,

    @field:NotBlank(message = "Telefone é obrigatório")
    val phone: String,

    val userType: UserType = UserType.WORKSHOP // Default type for new registrations
)

data class UserResponseDto(
    val id: Long,
    val name: String,
    val email: String,
    val phone: String,
    val userType: UserType,
    val createdAt: String
)