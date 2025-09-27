package com.autoservice.scheduler.service

import com.autoservice.scheduler.dto.UserRegistrationDto
import com.autoservice.scheduler.dto.UserResponseDto
import com.autoservice.scheduler.model.User
import com.autoservice.scheduler.repository.UserRepository
import org.springframework.stereotype.Service
import java.time.format.DateTimeFormatter

@Service
class UserService(
    private val userRepository: UserRepository
) {

    fun registerUser(userRegistrationDto: UserRegistrationDto): UserResponseDto {
        // Check if email already exists
        if (userRepository.existsByEmail(userRegistrationDto.email)) {
            throw IllegalArgumentException("Email já está em uso")
        }

        val user = User(
            name = userRegistrationDto.name,
            email = userRegistrationDto.email,
            phone = userRegistrationDto.phone,
            userType = userRegistrationDto.userType
        )

        val savedUser = userRepository.save(user)
        return mapToResponseDto(savedUser)
    }

    fun getAllUsers(): List<UserResponseDto> {
        return userRepository.findAll().map { mapToResponseDto(it) }
    }

    fun getUserById(id: Long): UserResponseDto? {
        val user = userRepository.findById(id).orElse(null)
        return user?.let { mapToResponseDto(it) }
    }

    fun getUserByEmail(email: String): UserResponseDto? {
        val user = userRepository.findByEmail(email)
        return user?.let { mapToResponseDto(it) }
    }

    private fun mapToResponseDto(user: User): UserResponseDto {
        return UserResponseDto(
            id = user.id,
            name = user.name,
            email = user.email,
            phone = user.phone,
            userType = user.userType,
            createdAt = user.createdAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
        )
    }
}