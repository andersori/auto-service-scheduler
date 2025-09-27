package com.autoservice.scheduler.repository

import com.autoservice.scheduler.model.Workshop
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface WorkshopRepository : JpaRepository<Workshop, Long> {
    fun findByWorkshopId(workshopId: String): Workshop?
}