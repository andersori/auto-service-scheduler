package com.autoservice.scheduler.config

import com.autoservice.scheduler.model.ServiceType
import com.autoservice.scheduler.model.User
import com.autoservice.scheduler.model.UserType
import com.autoservice.scheduler.model.Workshop
import com.autoservice.scheduler.repository.ServiceTypeRepository
import com.autoservice.scheduler.repository.UserRepository
import com.autoservice.scheduler.repository.WorkshopRepository
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import java.math.BigDecimal

@Component
class DataLoader(
    private val serviceTypeRepository: ServiceTypeRepository,
    private val workshopRepository: WorkshopRepository,
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
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
        
        // Initialize workshops if the table is empty
        if (workshopRepository.count() == 0L) {
            val workshops = listOf(
                Workshop(
                    name = "AutoService Centro",
                    address = "Rua das Flores, 123 - Centro - São Paulo, SP",
                    phone = "(11) 3456-7890",
                    description = "Oficina especializada em serviços automotivos completos com mais de 20 anos de experiência.",
                    hours = "Segunda à Sexta: 8h às 18h | Sábado: 8h às 12h",
                    services = """["Troca de óleo", "Revisão completa", "Freios", "Suspensão", "Alinhamento"]""",
                    rating = BigDecimal("4.8"),
                    workshopId = "oficina-centro",
                    registrationLanguage = "pt-BR"
                ),
                Workshop(
                    name = "AutoService Zona Sul",
                    address = "Av. Paulista, 456 - Zona Sul - São Paulo, SP",
                    phone = "(11) 2345-6789",
                    description = "Moderna oficina com equipamentos de última geração e atendimento personalizado.",
                    hours = "Segunda à Sexta: 7h30 às 18h30 | Sábado: 8h às 13h",
                    services = """["Alinhamento", "Balanceamento", "Ar condicionado", "Elétrica", "Diagnóstico"]""",
                    rating = BigDecimal("4.6"),
                    workshopId = "oficina-zona-sul",
                    registrationLanguage = "pt-BR"
                ),
                Workshop(
                    name = "AutoService Zona Norte",
                    address = "Rua dos Automóveis, 789 - Zona Norte - São Paulo, SP",
                    phone = "(11) 1234-5678",
                    description = "Specialized in national and imported vehicles with competitive prices.",
                    hours = "Monday to Friday: 8am to 5pm | Saturday: 8am to 12pm",
                    services = """["Tire replacement", "Diagnostics", "General mechanics", "Body work", "Painting"]""",
                    rating = BigDecimal("4.3"),
                    workshopId = "oficina-zona-norte",
                    registrationLanguage = "en-US"
                )
            )
            
            workshopRepository.saveAll(workshops)
        }
        
        // Initialize users if the table is empty
        if (userRepository.count() == 0L) {
            val users = listOf(
                User(
                    name = "Admin Sistema",
                    email = "admin@autoservice.com",
                    phone = "(11) 9999-9999",
                    password = passwordEncoder.encode("admin123"),
                    userType = UserType.ADMIN
                ),
                User(
                    name = "AutoService Centro",
                    email = "contato@oficina-centro.com",
                    phone = "(11) 3456-7890",
                    password = passwordEncoder.encode("centro123"),
                    userType = UserType.WORKSHOP
                ),
                User(
                    name = "AutoService Zona Sul", 
                    email = "contato@oficina-zona-sul.com",
                    phone = "(11) 2345-6789",
                    password = passwordEncoder.encode("zonasul123"),
                    userType = UserType.WORKSHOP
                ),
                User(
                    name = "AutoService Zona Norte",
                    email = "contact@oficina-zona-norte.com", 
                    phone = "(11) 1234-5678",
                    password = passwordEncoder.encode("zonanorte123"),
                    userType = UserType.WORKSHOP
                )
            )
            
            userRepository.saveAll(users)
        }
    }
}