package com.autoservice.scheduler.controller.config

import com.autoservice.scheduler.dto.ErrorResponseDto
import org.springframework.context.MessageSource
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.context.request.WebRequest

@RestControllerAdvice
class GlobalExceptionHandler(
    private val messageSource: MessageSource
) {

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationExceptions(
        ex: MethodArgumentNotValidException,
        request: WebRequest
    ): ResponseEntity<ErrorResponseDto> {
        val locale = request.locale

        val errors = ex.bindingResult.fieldErrors.map { error ->
            messageSource.getMessage(error.defaultMessage ?: "error.validation", null, locale)
        }

        val errorMessage = if (errors.isNotEmpty()) errors.first()
        else messageSource.getMessage("error.validation", null, locale)

        return ResponseEntity.badRequest().body(
            ErrorResponseDto(
                message = errorMessage,
                status = HttpStatus.BAD_REQUEST.value()
            )
        )
    }

    @ExceptionHandler(Exception::class)
    fun handleGenericException(
        ex: Exception,
        request: WebRequest
    ): ResponseEntity<ErrorResponseDto> {
        val locale = request.locale
        val message = messageSource.getMessage("error.internal", null, locale)

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
            ErrorResponseDto(
                message = message,
                status = HttpStatus.INTERNAL_SERVER_ERROR.value()
            )
        )
    }
}
