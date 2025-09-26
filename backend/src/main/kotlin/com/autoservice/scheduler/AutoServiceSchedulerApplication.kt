package com.autoservice.scheduler

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class AutoServiceSchedulerApplication

fun main(args: Array<String>) {
    runApplication<AutoServiceSchedulerApplication>(*args)
}