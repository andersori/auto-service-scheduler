package com.autoservice.scheduler.dto

import com.autoservice.scheduler.model.UserType
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank

data class UserRegistrationDto(
    @field:NotBlank(message = "user.name.notBlank")
    val name: String,

    @field:Email(message = "user.email.invalid")
    @field:NotBlank(message = "user.email.notBlank")
    val email: String,

    @field:NotBlank(message = "user.phone.notBlank")
    val phone: String,

    @field:NotBlank(message = "user.password.notBlank")
    val password: String,

    val userType: UserType = UserType.WORKSHOP // Default type for new registrations
)

data class LoginDto(
    @field:Email(message = "user.email.invalid")
    @field:NotBlank(message = "user.email.notBlank")
    val email: String,

    @field:NotBlank(message = "user.password.notBlank")
    val password: String
)

data class LoginResponseDto(
    val user: UserResponseDto,
    val message: String
)

data class UserResponseDto(
    val id: Long,
    val name: String,
    val email: String,
    val phone: String,
    val userType: UserType,
    val createdAt: String,
    val updatedAt: String
)