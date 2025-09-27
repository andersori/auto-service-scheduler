package com.autoservice.scheduler.dto

import java.math.BigDecimal

data class WorkshopResponseDto(
    val id: String,
    val name: String,
    val address: String,
    val phone: String,
    val description: String,
    val hours: String,
    val services: List<String>,
    val rating: BigDecimal
)