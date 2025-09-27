package com.autoservice.scheduler.config

import com.autoservice.scheduler.model.ServiceType
import com.autoservice.scheduler.repository.ServiceTypeRepository
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component

@Component
class DataLoader(
    private val serviceTypeRepository: ServiceTypeRepository
) : ApplicationRunner {

    override fun run(args: ApplicationArguments?) {
        // Initialize service types if the table is empty
        if (serviceTypeRepository.count() == 0L) {
            val serviceTypes = listOf(
                ServiceType(name = "Troca de óleo", isActive = true),
                ServiceType(name = "Revisão completa", isActive = true),
                ServiceType(name = "Alinhamento e balanceamento", isActive = true),
                ServiceType(name = "Troca de pneus", isActive = true),
                ServiceType(name = "Freios", isActive = true),
                ServiceType(name = "Suspensão", isActive = true),
                ServiceType(name = "Ar condicionado", isActive = true),
                ServiceType(name = "Outros", isActive = true)
            )
            
            serviceTypeRepository.saveAll(serviceTypes)
        }
    }
}