package com.autoservice.scheduler.repository

import com.autoservice.scheduler.model.ServiceType
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface ServiceTypeRepository : JpaRepository<ServiceType, Long> {
    
    @Query("SELECT st FROM ServiceType st WHERE st.isActive = true ORDER BY st.name")
    fun findActiveServiceTypes(): List<ServiceType>
}