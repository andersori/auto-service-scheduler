package com.autoservice.scheduler.service

import com.autoservice.scheduler.dto.LoginDto
import com.autoservice.scheduler.dto.LoginResponseDto
import com.autoservice.scheduler.dto.UserRegistrationDto
import com.autoservice.scheduler.dto.UserResponseDto
import com.autoservice.scheduler.model.User
import com.autoservice.scheduler.repository.UserRepository
import org.springframework.context.MessageSource
import org.springframework.context.i18n.LocaleContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Service
class UserService(
    private val userRepository: UserRepository,
    private val messageSource: MessageSource,
    private val passwordEncoder: PasswordEncoder
) {

    fun registerUser(userRegistrationDto: UserRegistrationDto): UserResponseDto {
        val locale = LocaleContextHolder.getLocale()
        
        // Check if email already exists
        if (userRepository.existsByEmail(userRegistrationDto.email)) {
            val errorMessage = messageSource.getMessage("user.email.exists", null, locale)
            throw IllegalArgumentException(errorMessage)
        }

        val user = User(
            name = userRegistrationDto.name,
            email = userRegistrationDto.email,
            phone = userRegistrationDto.phone,
            password = passwordEncoder.encode(userRegistrationDto.password),
            userType = userRegistrationDto.userType
        )

        val savedUser = userRepository.save(user)
        return mapToResponseDto(savedUser)
    }

    fun loginUser(loginDto: LoginDto): LoginResponseDto {
        val locale = LocaleContextHolder.getLocale()
        
        val user = userRepository.findByEmail(loginDto.email)
            ?: throw IllegalArgumentException(messageSource.getMessage("user.login.invalid", null, locale))

        if (!passwordEncoder.matches(loginDto.password, user.password)) {
            throw IllegalArgumentException(messageSource.getMessage("user.login.invalid", null, locale))
        }

        val successMessage = messageSource.getMessage("user.login.success", null, locale)
        return LoginResponseDto(
            user = mapToResponseDto(user),
            message = successMessage
        )
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
            createdAt = user.createdAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
            updatedAt = user.updatedAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
        )
    }
}