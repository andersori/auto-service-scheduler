package com.autoservice.scheduler.controller.config

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController
import java.util.Locale

@RestController
@CrossOrigin(origins = ["http://localhost:3000"])
abstract class DefaultControllerSettings {
    fun parseLocale(language: String): Locale {
        return when {
            language.startsWith("en") -> Locale("en", "US")
            language.startsWith("pt") -> Locale("pt", "BR")
            else -> Locale("pt", "BR") // Default to Portuguese
        }
    }
}
