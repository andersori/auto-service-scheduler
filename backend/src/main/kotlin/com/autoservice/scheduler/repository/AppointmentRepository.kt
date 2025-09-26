package com.autoservice.scheduler.repository

import com.autoservice.scheduler.model.Appointment
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface AppointmentRepository : JpaRepository<Appointment, Long> {
    
    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate BETWEEN :startDate AND :endDate")
    fun findAppointmentsByDateRange(startDate: LocalDateTime, endDate: LocalDateTime): List<Appointment>
    
    fun findByAppointmentDate(appointmentDate: LocalDateTime): List<Appointment>
}