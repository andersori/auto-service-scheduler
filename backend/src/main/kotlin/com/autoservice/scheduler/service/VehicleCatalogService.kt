package com.autoservice.scheduler.service

import org.springframework.stereotype.Service
import java.util.*

@Service
class VehicleCatalogService {

    fun getVehicleCatalogByWorkshop(workshop: String, locale: Locale): Map<String, List<String>> {
        // For now, return the same catalog for all workshops
        // In a real implementation, this could be stored in database per workshop
        return getDefaultVehicleCatalog()
    }
    
    private fun getDefaultVehicleCatalog(): Map<String, List<String>> {
        return mapOf(
            "Toyota" to listOf("Corolla", "Hilux", "Yaris", "Etios", "SW4", "RAV4", "Camry"),
            "Volkswagen" to listOf("Gol", "Polo", "Virtus", "T-Cross", "Nivus", "Saveiro", "Jetta"),
            "Ford" to listOf("Ka", "Fiesta", "Focus", "EcoSport", "Ranger", "Fusion", "Edge"),
            "Chevrolet" to listOf("Onix", "Prisma", "S10", "Tracker", "Spin", "Cruze", "Cobalt"),
            "Honda" to listOf("Civic", "Fit", "HR-V", "City", "WR-V", "CR-V"),
            "Hyundai" to listOf("HB20", "Creta", "Tucson", "Santa Fe", "ix35"),
            "Nissan" to listOf("Kicks", "Versa", "March", "Sentra", "Frontier"),
            "Fiat" to listOf("Uno", "Argo", "Mobi", "Toro", "Strada", "Cronos", "Pulse"),
            "Renault" to listOf("Sandero", "Logan", "Duster", "Kwid", "Captur"),
            "Jeep" to listOf("Renegade", "Compass", "Commander", "Wrangler"),
            "Peugeot" to listOf("208", "2008", "3008", "308"),
            "Citroën" to listOf("C3", "C4 Cactus", "Aircross", "C4 Lounge"),
            "Kia" to listOf("Sportage", "Cerato", "Soul", "Picanto"),
            "BMW" to listOf("320i", "X1", "X3", "X5", "118i"),
            "Mercedes-Benz" to listOf("Classe C", "Classe A", "GLA", "GLC", "Classe E"),
            "Audi" to listOf("A3", "A4", "Q3", "Q5", "A1"),
            "Mitsubishi" to listOf("L200", "ASX", "Outlander", "Pajero"),
            "Subaru" to listOf("Impreza", "Forester", "XV", "Outback"),
            "Chery" to listOf("Tiggo 2", "Tiggo 5X", "Arrizo 5", "QQ"),
            "Land Rover" to listOf("Evoque", "Discovery", "Defender", "Range Rover"),
            "Volvo" to listOf("XC60", "XC40", "XC90", "S60"),
            "JAC" to listOf("T40", "T50", "T60", "iEV40"),
            "Suzuki" to listOf("Vitara", "Jimny", "S-Cross", "Swift")
        )
    }
}