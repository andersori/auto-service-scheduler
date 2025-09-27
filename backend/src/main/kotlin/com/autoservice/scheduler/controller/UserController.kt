package com.autoservice.scheduler.controller

import com.autoservice.scheduler.dto.UserRegistrationDto
import com.autoservice.scheduler.dto.UserResponseDto
import com.autoservice.scheduler.service.UserService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = ["http://localhost:3000"])
class UserController(
    private val userService: UserService
) {

    @PostMapping("/register")
    fun registerUser(@Valid @RequestBody userRegistrationDto: UserRegistrationDto): ResponseEntity<*> {
        return try {
            val registeredUser = userService.registerUser(userRegistrationDto)
            ResponseEntity.ok(registeredUser)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().body(mapOf("error" to e.message))
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Erro interno do servidor"))
        }
    }

    @GetMapping
    fun getAllUsers(): ResponseEntity<List<UserResponseDto>> {
        val users = userService.getAllUsers()
        return ResponseEntity.ok(users)
    }

    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: Long): ResponseEntity<UserResponseDto> {
        val user = userService.getUserById(id)
        return if (user != null) {
            ResponseEntity.ok(user)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/email/{email}")
    fun getUserByEmail(@PathVariable email: String): ResponseEntity<UserResponseDto> {
        val user = userService.getUserByEmail(email)
        return if (user != null) {
            ResponseEntity.ok(user)
        } else {
            ResponseEntity.notFound().build()
        }
    }
}