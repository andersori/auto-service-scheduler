package com.autoservice.scheduler.repository

import com.autoservice.scheduler.model.User
import com.autoservice.scheduler.model.UserType
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): User?
    fun existsByEmail(email: String): Boolean
    fun findByUserType(userType: UserType): List<User>
}